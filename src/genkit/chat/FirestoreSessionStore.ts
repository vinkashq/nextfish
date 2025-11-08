import { firestore } from "@/firebase/server";
import { removeUndefinedDeep } from "@/lib/utils";
import { SessionData, SessionStore } from "genkit";

class FirestoreSessionStore<S = any> implements SessionStore<S> {
  private collectionRef = firestore.collection("chatSessions")

  async get(sessionId: string): Promise<SessionData<S> | undefined> {
    const doc = await this.collectionRef.doc(sessionId).get()
    if (!doc.exists) {
      return undefined
    }
    return doc.data() as SessionData<S>
  }
  async save(sessionId: string, sessionData: SessionData<S>): Promise<void> {
    const cleanedData = removeUndefinedDeep(sessionData)
    console.log("Saving session data:", cleanedData)
    await this.collectionRef.doc(sessionId).set(cleanedData)
  }
}

export default FirestoreSessionStore
