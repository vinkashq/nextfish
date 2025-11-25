import { Session, z } from "genkit";
import googleChatbot from "../google/chatbot";
import { DocumentData, FieldValue } from "firebase-admin/firestore";
import GenkitSessionStore from "../session/store";

const chatFlow = googleChatbot.defineFlow({
  name: "chatFlow",
  inputSchema: z.object({
    sessionId: z.string().optional(),
    message: z.string(),
  }),
}, async ({ sessionId, message }, { sendChunk }) => {
  let session: Session<DocumentData>
  const sessionStore = new GenkitSessionStore()

  if (!sessionId) {
    session = googleChatbot.createSession({
      store: sessionStore,
      initialState: {
        createdAt: FieldValue.serverTimestamp(),
        loadedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }
    })
  } else {
    session = await googleChatbot.loadSession(sessionId, {
      store: sessionStore,
    })
    session.updateState({
      loadedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }

  const chat = session.chat()

  const { stream, response } = chat.sendStream(message)
  for await (const chunk of stream) {
    sendChunk(chunk)
  }

  const { text } = await response

  return {
    text
  }
})

export default chatFlow