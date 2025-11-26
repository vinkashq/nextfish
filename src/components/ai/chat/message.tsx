import Markdown from "@/components/markdown"
import { MessageType } from "@/types/ai/chat"

export default function Message({ text, modelType, role, author }: MessageType) {
  return (
    <div className="message">
      {author.name}
      <p>{modelType} {role}</p>
      <Markdown text={text} />
    </div>
  )
}
