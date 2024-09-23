import { db } from "./firebaseApp.js";
export async function addDoc(colName, docName, data) {
  try {
    const colRef = db.collection(colName);
    if (docName) {
      const docRef = colRef.doc(docName);
      await docRef.set(data).then((req) => {
        console.log("Document created in :", colName, docName);
      });
    } else {
      // if docName is not given , auto-generate it
      await colRef.add(data).then((req) => {
        console.log("document created with docId", colName, req.id);
      });
    }
  } catch (error) {
    throw error;
  }
}

//getDoc by DocName
export async function getDoc(colName, docName) {
  try {
    const docRef = db.collection(colName).doc(docName);
    const doc = await docRef.get();
    if (doc.exists) return doc.data();
  } catch (error) {
    console.log("getDoc error", error.message);
  }
}

export async function getAllDocsWithId(colName) {
  const data = {};
  const colRef = db.collection(colName);
  const collection = await colRef.listDocuments();
  for (const doc of collection) {
    const docData = await doc.get();
    data[doc.id] = docData.data();
  }
  return data;
}

export async function getAllDocs(colName) {
  // TODO : check if user exist
  const colRef = db.collection(colName);
  const documents = await colRef.get();
  const arr = documents.docs.map((doc) => doc.data());
  //   documents.forEach(
  //       doc => {
  //           console.log(doc.data())
  //       }
  //   )
  return arr;
}

export async function updateDoc(colName, docName, kvpair) {
  const docRef = db.collection(colName).doc(docName);
  await docRef
    .update(kvpair)
    .then((res) => {
      console.log("updated");
    })
    .catch((error) => {
      throw error;
    });
}
export async function delDocs(colName) {
  const colRef = db.collection(colName);
  colRef.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      colRef.doc(doc.id).delete();
      console.log("deleted", doc.id);
    });
  });
}

export async function delDoc(colName, docName) {
  const docRef = db.collection(colName).doc(docName);
  const doc = await docRef.get();
  if (doc.exists) {
    await docRef.delete().then((res) => {
      // console.log("deleted",docName);
    });
    return true;
  } else {
    // console.log("Document not found",docName);
    return false;
  }
}

export async function getDocQuery(colName, firstQuery, secondQuery) {
  const colRef = db.collection(colName);
  let query = colRef.where(firstQuery[0], firstQuery[1], firstQuery[2]);
  if (secondQuery) {
    query = query.where(secondQuery[0], secondQuery[1], secondQuery[2]);
  }
  const querySnapshot = await query.get();
  const data = querySnapshot.docs.map((doc) => doc.data());
  // console.log(data)
  return data;
}
