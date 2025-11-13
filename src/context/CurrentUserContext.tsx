"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { baseUrl } from "@/config"
import { postRequest } from "@/lib/utils"
import { useAuth } from "./firebase/AuthContext"
import { useAnalytics } from "./firebase/AnalyticsContext"
import { useAppCheck } from "./firebase/AppCheckContext"

const idTokenVerificationUrl = `${baseUrl}/api/verify-id-token`
const serverSignOutUrl = `${baseUrl}/api/sign-out`

type CurrentUser = {
  isLoading: boolean,
  currentUser: User,
  idTokenVerified: boolean,
  signOut: () => Promise<void>,
}

const CurrentUserContext = createContext<CurrentUser>({
  isLoading: true,
  currentUser: null,
  idTokenVerified: undefined,
  signOut: async () => {},
})

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext)
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider")
  }
  return context
}

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { auth, signIn } = useAuth()
  const [currentUser, setCurrentUser] = useState<User>()
  const [authStateLoading, setAuthStateLoading] = useState(true)
  const [useServerToken, setUseServerToken] = useState(true)
  const [idTokenVerified, setIdTokenVerified] = useState<boolean | undefined>(undefined)

  const { logEvent } = useAnalytics()
  const { getAppCheckToken } = useAppCheck()

  const signOutOnClient = async () => {
    const uid = currentUser?.uid
    if (!uid) {
      return
    }
  
    await auth.signOut();
  
    logEvent('signed_out', {
      uid,
    });
  }

  const signOutOnServer = async (redirectUrl: string) => {
    const uid = currentUser?.uid
    if (!uid) {
      return
    }

    const appCheckToken = await getAppCheckToken()
    const response = await postRequest(serverSignOutUrl, appCheckToken)

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        logEvent('server_signed_out', {
          uid
        });
        redirectUrl = data.redirectUrl || redirectUrl;
      }
    }
  
    return redirectUrl
  }

  const signOut = async () => {
    let redirectUrl = baseUrl
  
    redirectUrl = await signOutOnServer(redirectUrl)
    await signOutOnClient()
  
    window.location.href = redirectUrl
  }

  const verifyIdToken = async (user: User) => {
    const idToken = await user?.getIdToken()
    if (!idToken) {
      console.error("User ID token is not available.")
      return false
    }
  
    try {
      const appCheckToken = await getAppCheckToken()
      const response = await postRequest(idTokenVerificationUrl, appCheckToken, { idToken })
      if (!response.ok) {
        console.error('Failed to verify ID token:', response.statusText)
        await signOutOnClient()
        return false
      }
    } catch (error) {
      console.error('Error verifying ID token:', error)
      await signOutOnClient()
      return false
    }
  
    logEvent('id_token_verified', {
      uid: user.uid,
    });
    return true;
  }

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (newUser) => {
        setCurrentUser(newUser)
        setAuthStateLoading(false)
      })
      return () => unsubscribe()
    }
  }, [auth])

  useEffect(() => {
    if (!authStateLoading && !currentUser && useServerToken) {
      signIn({})
        .then((userCredential) => {
          const user = userCredential?.user
          if (user) {
            setCurrentUser(user)
            setUseServerToken(false)
          }
        })
    }
  }, [currentUser, signIn, authStateLoading, useServerToken])

  useEffect(() => {
    if (currentUser && idTokenVerified === undefined) {
      verifyIdToken(currentUser)
        .then((verified) => {
          setIdTokenVerified(verified)
        })
        .catch((error) => {
          console.error('Error verifying ID token:', error)
          setIdTokenVerified(false)
        })
    }
  }, [currentUser, idTokenVerified, verifyIdToken])

  const value = {
    isLoading: authStateLoading || (!currentUser && useServerToken),
    currentUser,
    idTokenVerified,
    signOut,
  }

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}
