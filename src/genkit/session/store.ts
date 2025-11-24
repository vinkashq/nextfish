import { docRef } from "@/firebase/server/firestore";
import { DocumentData } from "firebase-admin/firestore";
import { SessionData, SessionStore } from "genkit";

class GenkitSessionStore<S = DocumentData> implements SessionStore<S> {
  get collectionPath() {
    return "genkitSessions"
  }

  async get(topicId: string): Promise<SessionData<S> | undefined> {
    const topicSessionRef = docRef(this.collectionPath, topicId)
    try {
      const sessionDoc = await topicSessionRef.get()
      return sessionDoc.data() as SessionData<S>
    } catch (err) {
      console.error(err)
      return undefined;
    }
  }

  async save(topicId: string, sessionData: SessionData<S>): Promise<void> {
    const topicSessionRef = docRef(this.collectionPath, topicId)
    await topicSessionRef.set(sessionData)
  }
}

export default GenkitSessionStore