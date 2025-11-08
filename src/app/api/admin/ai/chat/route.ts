import FirestoreSessionStore from "@/genkit/chat/FirestoreSessionStore"
import googleChatbot from "@/genkit/chat/google"
import { streamText } from "ai"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { id, message } = await req.json()

    // Generate response using Genkit chatbot
    const session = await googleChatbot.createSession({
      store: new FirestoreSessionStore(),
      sessionId: id,
     })
    const chat = session.chat()
    const prompt =message.parts?.map((part) => {
      if (part.type === "text") {
        return part.text
      }
      return ""
    }).join("\n\n")
    const result = await chat.send(prompt)

    // Get the text response
    const text = result.text || ""

    streamText()
    
    // Create a readable stream for the UI message stream format
    // Format: 0:"text-delta"{"textDelta":"word"}\n
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Stream the text word by word for smooth streaming
        const words = text.split(/(\s+)/)
        for (const word of words) {
          const chunk = `0:"text-delta"${JSON.stringify({ textDelta: word })}\n`
          controller.enqueue(encoder.encode(chunk))
          // Small delay for smooth streaming effect
          await new Promise((resolve) => setTimeout(resolve, 20))
        }
        // Send finish chunk
        const finishChunk = `0:"text-done"{}\n`
        controller.enqueue(encoder.encode(finishChunk))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to generate chat response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

