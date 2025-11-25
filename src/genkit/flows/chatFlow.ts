import { Session, z } from "genkit";
import googleChatbot from "@/genkit/google/chatbot";
import { DocumentData, FieldValue } from "firebase-admin/firestore";
import GenkitSessionStore from "@/genkit/session/store";

const chatFlow = googleChatbot.defineFlow({
  name: "chatFlow",
  inputSchema: z.object({
    sessionId: z.string().optional(),
    message: z.string(),
  }),
  streamSchema: z.string(),
  outputSchema: z.object({
    sessionId: z.string(),
    message: z.string(),
    model: z.string().optional(),
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
    sessionId = session.id
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
    sendChunk(chunk.text)
  }

  const { text, model } = await response

  return {
    sessionId,
    message: text,
    model,
  }
})

export default chatFlow