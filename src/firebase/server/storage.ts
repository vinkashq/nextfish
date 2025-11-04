import { storage } from ".";
import { storageBucket } from "../const";

const bucket = storage.bucket(storageBucket)

export { bucket };