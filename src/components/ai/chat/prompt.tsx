import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { ModelType } from "@/types/ai/chat";
import { ArrowUp, BookOpenText, Brain, CircleCheckBig, Lightbulb, MessageCircle } from "lucide-react";
import { ComponentProps, KeyboardEvent, useState } from "react";

type ChatPromptProps = {
  className?: string
  onSend: (promptMessage: string, modelType: ModelType) => void
} & ComponentProps<typeof InputGroup>

export default function ChatPrompt({ className, onSend, ...props }: ChatPromptProps) {
  const [promptMessage, setPromptMessage] = useState("")
  const [modelType, setModelType] = useState<ModelType>(1)
  const length = promptMessage.trim().length
  const disabled = length <= 2

  const onKeyDown = (e: KeyboardEvent) => {
    if (!disabled && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend(promptMessage, modelType)
      setPromptMessage("")
    }
  }

  const onClick = () => {
    onSend(promptMessage, modelType)
    setPromptMessage("")
  }

  return (
    <InputGroup className={cn("max-w-5xl mx-auto", className)} {...props}>
      <InputGroupTextarea
        autoFocus
        placeholder="Ask anything"
        onKeyDown={onKeyDown}
        onChange={(e) => setPromptMessage(e.target.value)}
        value={promptMessage}
        className="min-h-12"
      />
      <InputGroupAddon align="block-end">
        <ToggleGroup
          type="single"
          variant="outline"
          defaultValue="1"
          className="text-xs"
          value={modelType.toString()}
          onValueChange={(value) => setModelType(Number(value) as ModelType)}>
          <ToggleGroupItem value="1" size="sm" className="group">
            <MessageCircle />
            <span className="hidden group-aria-checked:block">Chat</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="2" size="sm" className="group">
            <CircleCheckBig />
            <span className="hidden group-aria-checked:block">Answer</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="3" size="sm" className="group">
            <Lightbulb />
            <span className="hidden group-aria-checked:block">Brainstorm</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="4" size="sm" className="group">
            <Brain />
            <span className="hidden group-aria-checked:block">Think</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="5" size="sm" className="group">
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