"use client"

import { createContext, ReactNode, useContext } from "react"
import { useFirebase } from "./Context"
import { Auth, AuthProvider as FirebaseAuthProvider, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signInWithRedirect, UserCredential } from "firebase/auth"
import { useAnalytics } from "./AnalyticsContext"
import { toast } from "sonner"
import { baseUrl, hostname } from "@/config"
import { postRequest } from "@/lib/utils"
import { useAppCheck } from "./AppCheckContext"

const serverTokenUrl = `${baseUrl}/api/token`

type SignInParams = {
  email?: string,
  password?: string,
  emailLink?: string,
  provider?: FirebaseAuthProvider,
  userCredential?: UserCredential,
}

type FirebaseAuth = {
  auth: Auth,
  signIn: (_params: SignInParams) => Promise<UserCredential>,
}

const AuthContext = createContext<FirebaseAuth>({
  auth: null,
  signIn: async () => {
    return null
  },
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, options } = useFirebase()
  const { logEvent } = useAnalytics()
  const { getAppCheckToken } = useAppCheck()

  const getServerToken = async (serverTokenUrl: string): Promise<string> => {
    const appCheckToken = await getAppCheckToken()
    const response = await postRequest(serverTokenUrl, appCheckToken);
    const token = await response.json()
    return token.value
  }

  const signIn = async ({ email, password, emailLink, provider, userCredential }: SignInParams) => {
    try {
      if (email && password) {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      } else if (email && emailLink) {
        userCredential = await signInWithEmailLink(auth, email, emailLink)
      } else if (provider) {
        if (options.authDomain !== hostname) {
          userCredential = await signInWithPopup(auth, provider)
        } else {
          userCredential = await signInWithRedirect(auth, provider)
        }
      } else if (!userCredential) {
        const serverToken = await getServerToken(serverTokenUrl)
        if (!serverToken) {
          return
        }
        userCredential = await signInWithCustomToken(auth, serverToken)
      }
      toast.success('Login successful!')

      logEvent('signed_in', {
        uid: userCredential.user.uid,
      })

      window.location.href = baseUrl;
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid credentials. Please check your email and/or password.', {
          duration: Infinity,
        });
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (provider) {
          toast.error(`Error signing in with Google: ${errorCode} - ${errorMessage}`)
        } else {
          toast.error(errorCode + ' ' + errorMessage);
        }
      }
    }
  
    return userCredential;
  }

  const value = { auth, signIn }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

