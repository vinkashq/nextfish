import googleImagen from "@/genkit/google/imagen"
import { z } from "genkit"
import generateImage from "@/genkit/tools/image/generate"
import createImageRecord from "../tools/image/createRecord"

const imageFlow = googleImagen.defineFlow(
  {
    name: "imageFlow",
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: z.object({ imageId: z.string() })
  },
  async ({ prompt }) => {
    const response = await generateImage.run({ prompt })
    const imageData = response.result
    await createImageRecord.run(imageData)
    return { imageId: imageData.imageId }
  }
)

export default imageFlow
