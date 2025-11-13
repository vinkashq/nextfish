"use client"

import { reCaptchaSiteKey } from "@/config"
import { Analytics, getAnalytics } from "firebase/analytics"
import { FirebaseApp, FirebaseOptions, getApp, initializeApp } from "firebase/app"
import { AppCheck, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
import { Auth, getAuth } from "firebase/auth"
import { Firestore, getFirestore } from "firebase/firestore"
import { FirebaseStorage, getStorage } from "firebase/storage"
import { createContext, ReactNode, useContext, useMemo } from "react"
import { AppCheckProvider } from "./AppCheckContext"
import { AnalyticsProvider } from "./AnalyticsContext"
import { AuthProvider } from "./AuthContext"

export type Firebase = {
  initialized: boolean,
  app: FirebaseApp,
  appCheck: AppCheck,
  auth: Auth,
  firestore: Firestore,
  storage: FirebaseStorage,
  analytics: Analytics,
}

const FirebaseContext = createContext<Firebase>({
  initialized: false,
  app: null,
  appCheck: null,
  auth: null,
  firestore: null,
  storage: null,
  analytics: null,
})

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

export const FirebaseProvider = ({ options, children }: { options: FirebaseOptions, children: ReactNode }) => {
  const windowType = typeof window
  const firebase = useMemo<Firebase>(() => {
    let app: FirebaseApp
    try {
      // Try to get existing app first
      app = getApp()
    } catch {
      // If no app exists, initialize a new one
      app = initializeApp(options)
    }

    let appCheck: AppCheck
    let analytics: Analytics
    if (windowType !== 'undefined') {
      if (reCaptchaSiteKey) {
        appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(reCaptchaSiteKey),
          isTokenAutoRefreshEnabled: true,
        })
      }
      analytics = getAnalytics(app)
    }

    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const storage = getStorage(app)
    const initialized = true

    return {
      initialized,
      app,
      appCheck,
      auth,
      firestore,
      storage,
      analytics,
    }
  }, [windowType, options])

  return (
    <FirebaseContext.Provider value={firebase}>
      <AppCheckProvider>
        <AnalyticsProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AnalyticsProvider>
      </AppCheckProvider>
    </FirebaseContext.Provider>
  )
}
