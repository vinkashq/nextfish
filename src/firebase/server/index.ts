import { App, applicationDefault, getApp, initializeApp, ServiceAccount } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
import { getAuth } from "firebase-admin/auth"

let app: App

try {
  app = getApp()
} catch {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = initializeApp({
      credential: applicationDefault()
    })
  } else if (process.env.SERVICE_ACCOUNT_KEY) {
    app = initializeApp(process.env.SERVICE_ACCOUNT_KEY as ServiceAccount)
  } else {
    app = initializeApp()
  }
}

const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {
  app,
  auth,
  firestore,
  storage,
}
