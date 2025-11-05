import imageFlow from "@/genkit/flows/imageFlow"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  try {
    const response = await imageFlow.run({ prompt })
    return NextResponse.json(response.result, { status: 200 })
  } catch (error) {
    console.error("Genkit flow error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
