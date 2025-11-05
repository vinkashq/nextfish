import googleImagen from "@/genkit/google/imagen"
import { z } from "genkit"

const imageFlow = googleImagen.defineFlow(
  {
    name: "imageFlow",
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: z.any()
  },
  async ({ prompt }) => {
    const result = await googleImagen.generate({
      prompt,
      config: {
        numberOfImages: 1,
      },
      output: { format: "media" }
    })

    const media = result.media
    if (!media) {
        throw new Error("Image generation failed or returned no media.");
    }

    return media
  }
)

export default imageFlow