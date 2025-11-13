"use client"

import { createContext, ReactNode, useContext } from "react"
import { useFirebase } from "./Context"
import { logEvent as _logEvent, Analytics } from "firebase/analytics"

type FirebaseAnalytics = {
  analytics: Analytics,
  logEvent: (_eventName: string, _eventParams?: Record<string, any>) => void,
}

const AnalyticsContext = createContext<FirebaseAnalytics>({
  analytics: null,
  logEvent: () => {},
})

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const { analytics } = useFirebase()
  const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
    _logEvent(analytics, eventName, eventParams)
  }

  const value = { analytics, logEvent }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

