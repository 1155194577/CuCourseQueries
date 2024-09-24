import { db } from "./firebaseApp";

export async function getAllDocsWithId(colName: string): Promise<{[key: string]: any }> {
  const data: { [key: string]: any } = {};
  const colRef = db.collection(colName);
  const collection = await colRef.listDocuments();
  for (const doc of collection) {
    const docData = await doc.get();
    data[doc.id] = docData.data();
  }
  return data;
}

export async function getAllDocs(colName: string): Promise<{[key: string]: any }[]> {
  // TODO : check if user exist
  const colRef = db.collection(colName);
  const documents = await colRef.get();
  const arr = documents.docs.map((doc) => doc.data());
  return arr;
}

export async function delDocs(colName: string): Promise<void> {
  const colRef = db.collection(colName);
  colRef.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      colRef.doc(doc.id).delete();
      console.log("deleted", doc.id);
    });
  });
}
