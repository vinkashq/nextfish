import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { ArrowUp, BookOpenText, Brain, CircleCheckBig, Lightbulb, MessageCircle } from "lucide-react";
import { ComponentProps, KeyboardEvent, useState } from "react";

type ChatPromptProps = {
  className?: string
  onSend: (prompt: string, type: string) => void
} & ComponentProps<typeof InputGroup>

export default function ChatPrompt({ className, onSend, ...props }: ChatPromptProps) {
  const [prompt, setPrompt] = useState("")
  const [type, setType] = useState("chat")
  const length = prompt.trim().length
  const disabled = length <= 2

  const onKeyDown = (e: KeyboardEvent) => {
    if (!disabled && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend(prompt, type)
      setPrompt("")
    }
  }

  const onClick = () => {
    onSend(prompt, type)
    setPrompt("")
  }

  return (
    <InputGroup className={cn("max-w-5xl mx-auto", className)} {...props}>
      <InputGroupTextarea
        autoFocus
        placeholder="Ask anything"
        onKeyDown={onKeyDown}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="min-h-12"
      />
      <InputGroupAddon align="block-end">
        <ToggleGroup type="single" variant="outline" defaultValue="chat" className="text-xs" value={type} onValueChange={setType}>
          <ToggleGroupItem value="chat" size="sm" className="group">
            <MessageCircle />
            <span className="hidden group-aria-checked:block">Chat</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="answer" size="sm" className="group">
            <CircleCheckBig />
            <span className="hidden group-aria-checked:block">Answer</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="brainstorm" size="sm" className="group">
            <Lightbulb />
            <span className="hidden group-aria-checked:block">Brainstorm</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="think" size="sm" className="group">
            <Brain />
            <span className="hidden group-aria-checked:block">Think</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="research" size="sm" className="group">
            <BookOpenText />
            <span className="hidden group-aria-checked:block">Research</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <InputGroupButton
          variant="default"
          className="rounded-full ml-auto"
          size="icon-xs"
          disabled={disabled}
          onClick={onClick}
        >
          <ArrowUp />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}