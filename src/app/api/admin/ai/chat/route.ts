import { auth } from "@/firebase/server"
import googleChatbot from "@/genkit/google/chatbot"
import GenkitSessionStore from "@/genkit/session/store"
import { DocumentData, FieldValue } from "firebase-admin/firestore"
import { Session } from "genkit"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const sessionStore = new GenkitSessionStore()
  const data = await request.json()
  const query = data.query
  let sessionId = data.sessionId
  let session: Session<DocumentData>
  const userId = request.headers.get("x-user-id")
  const currentUser = await auth.getUser(userId)

  if (!sessionId) {
    session = googleChatbot.createSession({
      store: sessionStore,
      initialState: {
        userId: currentUser.uid,
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

  const chat = session.chat({
    context: {
      auth: currentUser
    }
  })
  const encoder = new TextEncoder()

  const readableStream = new ReadableStream({
    async start(controller) {
      const streamResponse = chat.sendStream(query)
      for await (const chunk of streamResponse.stream) {
        const text = encoder.encode(chunk.text)
        controller.enqueue(text)
      }
      controller.close()
    }
  })

  return new NextResponse(readableStream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  })
}

