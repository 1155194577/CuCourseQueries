import {
  dBcollectionType,
  dBDocumentStrictType,
  dBDocumentType,
  FireBaseQueryType,
} from "../../types/fireBaseQuery";
import { dbMap } from "./firebaseApp";
export async function addDoc(
  dBdocument: dBDocumentType,
  data: { [key: string]: any }
): Promise<boolean> {
  try {
    // assume dBdocument is parsed already when pass into this function
    const dbName: string = dBdocument.dbName;
    const colName: string = dBdocument.colName;
    const docName: string | undefined = dBdocument?.docName;
    const db: FirebaseFirestore.Firestore = dbMap[dbName];
    const colRef = db.collection(colName);
    if (docName) {
      const docRef = colRef.doc(docName);
      await docRef.set(data).then(() => {
        console.log("Document created in :", colName, docName);
      });
    } else {
      // if docName is not given, auto-generate it
      await colRef.add(data).then((req) => {
        console.log("document created with docId", colName, req.id);
      });
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log("addDoc error", error.message);
    }
    return false;
  }
}

// getDoc by DocName
export async function getDoc<T>(
  dBdocument: dBDocumentStrictType
): Promise<T | undefined> {
  try {
    // assume dBdocument is parsed already when pass into this function
    const dbName: string = dBdocument.dbName;
    const colName: string = dBdocument.colName;
    const docName: string = dBdocument.docName;
    const db: FirebaseFirestore.Firestore = dbMap[dbName];
    const docRef = db.collection(colName).doc(docName);
    const doc = await docRef.get();
    console.log(doc.exists);
    if (doc.exists) return doc.data() as T;
  } catch (error) {
    if (error instanceof Error) {
      console.log("getDoc error", error.message);
      return undefined;
    }
  }
}
export async function updateGenericDoc(
  dBdocument: dBDocumentStrictType,
  kvpair: { [key: string]: any }
): Promise<boolean> {
  try {
    // assume dBdocument is parsed already when pass into this function
    const dbName: string = dBdocument.dbName;
    const colName: string = dBdocument.colName;
    const docName: string = dBdocument.docName;
    const db: FirebaseFirestore.Firestore = dbMap[dbName];
    const docRef = db.collection(colName).doc(docName);
    await docRef.update(kvpair);
    console.log("updated");
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log("updateDoc error", error.message);
    }
    return false;
  }
}

async function delDoc(dBdocument: dBDocumentStrictType): Promise<boolean> {
  try {
    // assume dBdocument is parsed already when pass into this function
    const dbName: string = dBdocument.dbName;
    const colName: string = dBdocument.colName;
    const docName: string = dBdocument.docName;
    const db: FirebaseFirestore.Firestore = dbMap[dbName];
    const docRef = db.collection(colName).doc(docName);
    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.delete().then(() => {
        console.log("deleted", docName);
      });
      return true;
    } else {
      console.log("Document not found", docName);
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("delDoc error", error.message);
    }
    return false;
  }
}

export async function getDocByQuery<T>(
  dBcollection: dBcollectionType,
  fireBaseQuerys: FireBaseQueryType[]
): Promise<T | undefined> {
  try {
    // assume dBcollection is parsed already when pass into this function
    const dbName: string = dBcollection.dbName;
    const colName: string = dBcollection.colName;
    const db: FirebaseFirestore.Firestore = dbMap[dbName];
    let colRef = db.collection(colName);
    let query: FirebaseFirestore.Query = colRef;
    for (const fireBaseQuery of fireBaseQuerys) {
      query = query.where(
        fireBaseQuery.field,
        fireBaseQuery.operator,
        fireBaseQuery.value
      );
    }
    const querySnapshot = await query.get();
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.log("getDocByQuery error", error.message);
    }
    return undefined;
  }
}
