import googleImagen from "@/genkit/google/imagen";
import { z } from "genkit";
import { imageGenerateOutputSchema } from "./generate";
import { firestore } from "@/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

const createImageRecord = googleImagen.defineTool(
  {
    name: "createRecord",
    description: "Create a record in the database",
    inputSchema: imageGenerateOutputSchema,
    outputSchema: z.boolean().describe("Whether the record was created successfully"),
  },
  async (imageData) => {
    const imageRef = firestore.collection("images").doc(imageData.imageId)
    await imageRef.create({ ...imageData, createdAt: FieldValue.serverTimestamp() })
    return true
  }
)

export default createImageRecord
