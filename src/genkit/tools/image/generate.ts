import { bucket } from "@/firebase/server/storage"
import googleImagen from "@/genkit/google/imagen"
import { z } from "genkit"
import { getSharp } from "next/dist/server/image-optimizer"
import parseDataURL from 'data-urls'
import { Vibrant } from 'node-vibrant/node'

export const imageGenerateOutputSchema = z.object({
  imageId: z.string(),
  bucketName: z.string(),
  imagePath: z.string(),
  mimeType: z.string(),
  extension: z.string(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
  aspectRatio: z.number(),
  colors: z.object({
    vibrant: z.string().optional(),
    muted: z.string().optional(),
    darkVibrant: z.string().optional(),
    darkMuted: z.string().optional(),
    lightVibrant: z.string().optional(),
    lightMuted: z.string().optional(),
  }).optional()
})

const generateImage = googleImagen.defineTool(
  {
    name: "imageGenerate",
    description: "Generate an image based on a prompt",
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: imageGenerateOutputSchema
  },
  async ({ prompt }) => {
    const result = await googleImagen.generate({
      prompt,
      config: {
        numberOfImages: 1,
      },
      output: { format: "media" }
    })

    const media = result?.media
    if (!media || !media.url) {
      throw new Error('Image generation failed to return media data.');
    }

    const parsedData = parseDataURL(media.url)

    if (!parsedData) {
      throw new Error('Failed to parse the data URL from image generation.');
    }

    const imageBuffer: Buffer = parsedData.body
    const mimeType = parsedData.mimeType.toString()
    const extension = mimeType.split('/')[1] || "png"

    const sharp = getSharp(1)
    const imageMetadata = await sharp(imageBuffer).metadata()
    const { size, width, height } = imageMetadata
    const aspectRatio = width / height

    // Extract colors using node-vibrant
    let colors: {
      vibrant?: string;
      muted?: string;
      darkVibrant?: string;
      darkMuted?: string;
      lightVibrant?: string;
      lightMuted?: string;
    } | undefined

    try {
      const palette = await Vibrant.from(imageBuffer).getPalette()
      colors = {
        vibrant: palette.Vibrant?.hex,
        muted: palette.Muted?.hex,
        darkVibrant: palette.DarkVibrant?.hex,
        darkMuted: palette.DarkMuted?.hex,
        lightVibrant: palette.LightVibrant?.hex,
        lightMuted: palette.LightMuted?.hex,
      }
    } catch (error) {
      console.warn('Failed to extract colors from image:', error)
      // Colors extraction is optional, so we continue without it
    }

    const imageId = crypto.randomUUID()
    const imagePath = `images/${imageId}.${extension}`
    const file = bucket.file(imagePath)
    const metadata = {
      mimeType,
      aspectRatio,
      size,
      width,
      height,
    }

    await file.save(imageBuffer, { metadata })

    return Object.assign(
      { imageId, bucketName: bucket.name, imagePath },
      metadata,
      colors ? { colors } : {}
    )
  }
)

export default generateImage
