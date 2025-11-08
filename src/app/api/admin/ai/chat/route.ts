import googleChatbot from "@/genkit/google/chatbot"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Build the conversation context from messages
    // For Genkit, we'll combine the conversation into a single prompt
    // or use the last message with context
    const conversationHistory = messages
      .map((msg: { role: string; content: string }) => {
        const role = msg.role === "user" ? "User" : "Assistant"
        return `${role}: ${msg.content}`
      })
      .join("\n\n")

    const currentMessage = messages[messages.length - 1]?.content || ""
    
    // Build prompt with conversation history
    const prompt = conversationHistory.length > currentMessage.length
      ? `${conversationHistory}\n\nAssistant:`
      : currentMessage

    // Generate response using Genkit chatbot
    const result = await googleChatbot.generate(prompt)

    // Get the text response
    const text = result.text || ""
    
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

