"use client"

import { useState } from "react"
import { streamFlow } from "@genkit-ai/next/client"
import chatFlow from "@/genkit/flows/chatFlow"
import ChatPrompt from "@/components/ai/chat/prompt"

export default function ChatPage() {
  const [streamedMessage, setStreamedMessage] = useState("")

  const send = async (promptMessage: string) => {
    const response = streamFlow<typeof chatFlow>({
      url: "/api/admin/ai/chat",
      input: { message: promptMessage },
    })

    for await (const chunk of response.stream) {
      setStreamedMessage((prev) => prev + chunk)
    }

    const { sessionId, message, model } = await response.output
    setStreamedMessage(message)
  }

  return (
    <>
      {streamedMessage}
      <ChatPrompt onSend={send} />
    </>
  )
}
