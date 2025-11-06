"use server"

import { firestore } from "@/firebase/server";
import { bucket } from "@/firebase/server/storage";

export const getImageResponse = async (id: string) => {
  const imageRef = firestore.collection("images").doc(id);
  const imageDoc = await imageRef.get()
  if (!imageDoc.exists) {
    return new Response("Image doc not found in database", { status: 404 });
  }

  const imageData = imageDoc.data();

  const imagePath: string = imageData.storagePath
  if (!imagePath) {
    return new Response("Image path not found", { status: 404 });
  }

  const image = bucket.file(imagePath);
  const [metadata] = await image.getMetadata();
  const stream = image.createReadStream();

  const headers = new Headers({
    "Content-Type": metadata.contentType || "application/octet-stream",
    "Cache-Control": "public, max-age=3600",
  });

  return new Response(stream as any, { headers });
}
