import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics, logEvent as _logEvent } from "firebase/analytics";
import { useStore } from '@nanostores/react';
import { $analytics, $app, $appCheck, $auth, $firestore, $loading, $storage, setAnalytics, setApp, setAppCheck, setAuth, setFirestore, setLoading, setStorage } from "./store";
import { baseUrl, idTokenVerificationUrl, recaptchaSiteKey, serverSignOutUrl, serverTokenUrl } from "@/config";
import { initialize } from "@authfire/core"
import config from "./config";

const useFirebase = () => {
  let isLoading = useStore($loading);
  let app = useStore($app);
  let appCheck = useStore($appCheck);
  let auth = useStore($auth);
  let firestore = useStore($firestore);
  let storage = useStore($storage);
  let analytics = useStore($analytics);

  if (!app) {
    try {
      app = getApp() || initializeApp(config)
    } catch {
      app = initializeApp(config)
    }
    setApp(app);
  }

  if (!appCheck && recaptchaSiteKey) {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true
    });
    setAppCheck(appCheck);
  }

  if (!auth) {
    auth = getAuth(app);
    setAuth(auth);
  }

  if (!firestore) {
    firestore = getFirestore(app);
    setFirestore(firestore);
  }

  if (!storage) {
    storage = getStorage(app);
    setStorage(storage);
  }

  if (!analytics && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
    setAnalytics(analytics);
  }

  isLoading = false;
  setLoading(isLoading);

  return {
    isLoading,
    app,
    appCheck,
    auth,
    firestore,
    storage,
    analytics
  }
}

const getAppCheckToken = async (forceRefresh: boolean = false) => {
  const appCheck = $appCheck.get();
  if (typeof window === 'undefined') {
    throw new Error("App Check is not available on the server side.");
  } else if (!appCheck) {
    throw new Error("App Check is not initialized. Ensure recaptchaSiteKey is set.");
  }
  const result = await getToken(appCheck, forceRefresh);
  return result.token;
}

 
const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  const analytics = $analytics.get();
  if (!analytics) {
    console.warn("Analytics is not available in this environment.");
    return;
  }
  _logEvent(analytics, eventName, eventParams);
}

initialize({
  baseUrl,
  idTokenVerificationUrl,
  serverTokenUrl,
  serverSignOutUrl,
  useFirebase,
  getAppCheckToken,
  logEvent
})

export { useFirebase, getAppCheckToken, logEvent };
