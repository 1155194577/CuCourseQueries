import { dbMap } from "./firebaseApp";
// export async function getAllDocsWithId(colName: string): Promise<{[key: string]: any }> {
//   const data: { [key: string]: any } = {};
//   const colRef = db.collection(colName);
//   const collection = await colRef.listDocuments();
//   for (const doc of collection) {
//     const docData = await doc.get();
//     data[doc.id] = docData.data();
//   }
//   return data;
// }

export async function getAllDocs(
  dbName: string,
  colName: string
): Promise<{ [key: string]: any }[]> {
  const db: FirebaseFirestore.Firestore = dbMap[dbName];
  const colRef: FirebaseFirestore.CollectionReference = db.collection(colName);
  const documents = await colRef.get();
  if (documents.empty) {
    console.log("No matching documents.");
    return [];
  }
  const arr: { [key: string]: any }[] = documents.docs.map((doc: any) =>
    doc.data()
  );
  return arr;
}

// export async function delDocs(colName: string): Promise<void> {
//   const colRef = db.collection(colName);
//   colRef.onSnapshot((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       colRef.doc(doc.id).delete();
//       console.log("deleted", doc.id);
//     });
//   });
// }
