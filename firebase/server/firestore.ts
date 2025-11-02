import { firestore } from ".";

const collectionRef = (path: string) => firestore.collection(path)
const docRef = (collectionPath: string, docPath: string) => collectionRef(collectionPath).doc(docPath)
const getDoc = (collectionPath: string, docPath: string) => docRef(collectionPath, docPath).get()
const whereDoc = (collection: string, key: string, value: any) => {
  return collectionRef(collection).where(key, "==", value).get()
}
const findDoc = async (collection: string, key: string, value: any) => {
  const snapshot = await whereDoc(collection, key, value)
  if (snapshot.empty) {
    return null
  }
  return snapshot.docs.at(0)
}
const getData = async (collectionPath: string, docPath: string) => {
  const doc = await getDoc(collectionPath, docPath)
  return doc?.data
}
const findData = async (collection: string, key: string, value: any) => {
  const doc = await findDoc(collection, key, value)
  return doc?.data
}

export {
  collectionRef,
  docRef,
  getDoc,
  whereDoc,
  findDoc,
  getData,
  findData
}