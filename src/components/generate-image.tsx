"use client"

import { InputGroup, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from "sonner";

export default function GenerateImage() {
  const [prompt, setPrompt] = useState("")
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    setGenerating(true)
    fetch("/admin/images/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error generating image")
      }
      response.json().then(() => {
        toast.success("Image generated")
        setPrompt("")
      })
    }).catch((err) => {
      console.error("Error generating image:", err)
      toast.error("Error generating image")
    }).finally(() => {
      setGenerating(false)
    })
  }

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Image Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton className="ml-auto" size="sm" variant="default" onClick={generate} disabled={generating}>
            {generating ? "Generating..." : "Generate"}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
