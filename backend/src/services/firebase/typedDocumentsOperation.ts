import { dBcollectionType } from "../../types/fireBaseQuery";
import { dbMap } from "./firebaseApp";
export async function getAllDocs<T>(
  dBcollection: dBcollectionType
): Promise<T[] | []> {
  const dbName: string = dBcollection.dbName;
  const colName: string = dBcollection.colName;
  const db: FirebaseFirestore.Firestore = dbMap[dbName];
  const colRef: FirebaseFirestore.CollectionReference = db.collection(colName);
  const documents = await colRef.get();
  if (documents.empty) {
    console.log("No matching documents.");
    return [];
  }
  const arr: T[] = documents.docs.map((doc: any) => doc.data());
  return arr as T[];
}
