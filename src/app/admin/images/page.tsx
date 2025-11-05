import GenerateImage from "@/components/generate-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { firestore } from "@/firebase/server";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default async function Page() {
  const images: DocumentData[] = []
  const query = firestore.collection("images").orderBy("createdAt", "desc").limit(10)

  const snapshot = await query.get()
  snapshot.docs.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    data.url = `/admin/images/${data.id}.${data.extension}`
    images.push(data)
  })

  return (
    <div className="flex flex-col gap-4 grow">
      <GenerateImage />
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {images?.map((image) => (
          <AspectRatio ratio={image.aspectRatio} key={image.id} className="border">
            <Image width={image.width} height={image.height} src={image.url} alt={image.prompt} className="rounded-md object-cover" />
          </AspectRatio>
        ))}
      </div>
    </div>
  )
}
