import { storage } from "."
import { firebaseOptions } from "@/firebase";

let defaultBucketName: string
if (firebaseOptions) {
  defaultBucketName = firebaseOptions.storageBucket
}
const bucket = defaultBucketName ? storage.bucket(defaultBucketName) : storage.bucket()

export { bucket };
