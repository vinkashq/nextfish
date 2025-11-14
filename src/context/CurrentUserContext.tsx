"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { getRedirectResult, onAuthStateChanged, User } from "firebase/auth"
import { baseUrl } from "@/config"
import { postRequest } from "@/lib/utils"
import { useAuth } from "./firebase/AuthContext"
import { useAnalytics } from "./firebase/AnalyticsContext"
import { useAppCheck } from "./firebase/AppCheckContext"

const idTokenVerificationUrl = `${baseUrl}/api/verify-id-token`
const serverSignOutUrl = `${baseUrl}/api/sign-out`
const serverTokenUrl = `${baseUrl}/api/token`

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

  const getServerToken = useCallback(async (serverTokenUrl: string): Promise<string> => {
    const appCheckToken = await getAppCheckToken()
    const response = await postRequest(serverTokenUrl, appCheckToken);
    if (!response.ok) {
      console.error('Failed to get server token:', response.statusText)
      return null
    }
    const token = await response.json()
    return token.value
  }, [getAppCheckToken])

  const signOutOnClient = useCallback(async () => {
    const uid = currentUser?.uid
    if (!uid) {
      return
    }
  
    await auth.signOut();
  
    logEvent('signed_out', {
      uid,
    });
  }, [auth, currentUser, logEvent])

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

  const verifyIdToken = useCallback(async (user: User) => {
    const idToken = await user?.getIdToken()
    if (!idToken) {
      console.error("User ID token is not available.")
      return false
    }
  
    try {
      const appCheckToken = await getAppCheckToken()
      if (!appCheckToken) {
        return false
      }
      const response = await postRequest(idTokenVerificationUrl, appCheckToken, { idToken })
      if (!response.ok) {
        console.error('Failed to verify ID token:', response.statusText)
        return false
      }
    } catch (error) {
      console.error('Error verifying ID token:', error)
      return false
    }
  
    logEvent('id_token_verified', {
      uid: user.uid,
    });
    return true;
  }, [getAppCheckToken, logEvent])

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (newUser) => {
        setCurrentUser(newUser)
        setAuthStateLoading(false)
        // Reset idTokenVerified when a new user signs in (not when signing out)
        // This allows verification to run for new users
        if (newUser) {
          setIdTokenVerified(undefined)
        }
      })

      getRedirectResult(auth).then((userCredential) => {
        if (!userCredential) {
          return
        }
        signIn({ userCredential })
      }).catch((error) => {
        console.log(error)
      })

      return () => unsubscribe()
    }
  }, [auth, signIn])

  useEffect(() => {
    // Only attempt server token sign-in if:
    // 1. Auth state is loaded
    // 2. No current user
    // 3. Server token sign-in hasn't been attempted yet
    // 4. ID token verification hasn't failed (to prevent loops after verification failures)
    if (!authStateLoading && !currentUser && useServerToken && idTokenVerified !== false) {
      getServerToken(serverTokenUrl).then((serverToken) => {
        if (!serverToken) {
          setUseServerToken(false)
          return
        }
        signIn({ serverToken })
          .finally(() => {
            setUseServerToken(false)
          })
      })
    }
  }, [currentUser, signIn, authStateLoading, useServerToken, idTokenVerified, getServerToken])

  useEffect(() => {
    if (currentUser && idTokenVerified === undefined) {
      verifyIdToken(currentUser)
        .then((verified) => {
          setIdTokenVerified(verified)

          if (!verified) {
            signOutOnClient()
          }
        })
        .catch((error) => {
          console.error('Error verifying ID token:', error)
          setIdTokenVerified(false)
        })
    }
  }, [currentUser, idTokenVerified, verifyIdToken, signOutOnClient])

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
