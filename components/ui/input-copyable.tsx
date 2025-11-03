"use client"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Check, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type InputCopyableProps = {
  value: string
} & React.ComponentProps<typeof InputGroup>

export function InputCopyable(props: InputCopyableProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const CopyButton = ({ isCopied }: { isCopied: boolean }) => {
    if (isCopied) {
      return (
        <Tooltip defaultOpen={true}>
          <TooltipTrigger asChild><Check /></TooltipTrigger>
          <TooltipContent>Copied!</TooltipContent>
        </Tooltip>
      )
    }

    return (
        <Tooltip>
          <TooltipTrigger asChild><Copy /></TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
      )
  }

  return (
    <InputGroup {...props}>
      <InputGroupInput value={props.value} readOnly className="overflow-ellipsis" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Copy"
          title="Copy"
          size="icon-xs"
          onClick={() => {
            copyToClipboard(props.value)
          }}
        >
          <CopyButton isCopied={isCopied} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
