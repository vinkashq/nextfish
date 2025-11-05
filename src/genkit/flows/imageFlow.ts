import { bucket } from "@/firebase/server/storage"
import googleImagen from "@/genkit/google/imagen"
import { z } from "genkit"
import parseDataURL from 'data-urls'
import { firestore } from "@/firebase/server"
import { FieldValue } from "firebase-admin/firestore"

const imageFlow = googleImagen.defineFlow(
  {
    name: "imageFlow",
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: z.object({ imageId: z.string() })
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

    const imageBuffer = parsedData.body;
    const mimeType = parsedData.mimeType;
    const extension = mimeType.split('/')[1] || "png"

    const imageId = crypto.randomUUID()
    const imagePath = `images/${imageId}.${extension}`
    const file = bucket.file(imagePath)

    await file.save(imageBuffer, {
      metadata: {
        contentType: mimeType,
      },
    });

    const imageDoc = firestore.collection("images").doc(imageId)
    await imageDoc.create({
      prompt,
      bucketName: file.bucket.name,
      storagePath: imagePath,
      mimeType,
      extension,
      createdAt: FieldValue.serverTimestamp(),
    })

    return { imageId }
  }
)

export default imageFlow