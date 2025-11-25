import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { ArrowUp, Plus } from "lucide-react";
import { ComponentProps, KeyboardEvent, useState } from "react";

type ChatPromptProps = {
  className?: string
  onSend: (prompt: string) => void
} & ComponentProps<typeof InputGroup>

export default function ChatPrompt({ className, onSend, ...props }: ChatPromptProps) {
  const [prompt, setPrompt] = useState("")
  const length = prompt.trim().length
  const disabled = length <= 2

  const onKeyDown = (e: KeyboardEvent) => {
    if (!disabled && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend(prompt)
      setPrompt("")
    }
  }

  const onClick = () => {
    onSend(prompt)
    setPrompt("")
  }

  return (
    <InputGroup className={cn("max-w-5xl", className)} {...props}>
      <InputGroupTextarea
        placeholder="Ask anything"
        onKeyDown={onKeyDown}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="min-h-12"
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          className="rounded-full"
          size="icon-xs"
        >
          <Plus />
        </InputGroupButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton variant="ghost">Chat</InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="[--radius:0.95rem]"
          >
            <DropdownMenuItem>Chat</DropdownMenuItem>
            <DropdownMenuItem>Answer</DropdownMenuItem>
            <DropdownMenuItem>Think</DropdownMenuItem>
            <DropdownMenuItem>Deep Think</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <InputGroupButton
          variant="default"
          className="rounded-full"
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