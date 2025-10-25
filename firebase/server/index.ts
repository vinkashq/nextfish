import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
import { getAuth } from "firebase-admin/auth"

const app = initializeApp()
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {
  app,
  auth,
  firestore,
  storage,
}