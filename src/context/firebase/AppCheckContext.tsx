"use client"

import { createContext, ReactNode, useContext } from "react"
import { useFirebase } from "./Context"
import { AppCheck, getToken } from "firebase/app-check"

type FirebaseAppCheck = {
  appCheck: AppCheck,
  getAppCheckToken: () => Promise<string>,
}

const AppCheckContext = createContext<FirebaseAppCheck>({
  appCheck: null,
  getAppCheckToken: () => Promise.resolve(""),
})

export const useAppCheck = () => {
  const context = useContext(AppCheckContext)
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

export const AppCheckProvider = ({ children }: { children: ReactNode }) => {
  const { appCheck } = useFirebase()
  const getAppCheckToken = async () => {
    try {
      const tokenResult = await getToken(appCheck)
      return tokenResult.token
    } catch (error) {
      console.error("Error getting App Check token:", error)
      return ""
    }
  }

  const value = { appCheck, getAppCheckToken }

  return (
    <AppCheckContext.Provider value={value}>
      {children}
    </AppCheckContext.Provider>
  )
}

