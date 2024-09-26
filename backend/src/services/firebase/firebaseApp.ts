import admin from "firebase-admin";
import fireBaseKey from "../../config/fireBaseKeyConfig";
import firebase, { getFirestore } from "firebase-admin/firestore";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = fireBaseKey as ServiceAccount;

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const defaultDB: admin.firestore.Firestore = getFirestore(app);
const courseDataDB: admin.firestore.Firestore = getFirestore(app, "coursedata");

type dbMapType = {
  [key: string]: FirebaseFirestore.Firestore;
};

export const dbMap: dbMapType = {
  default: defaultDB,
  courseData: courseDataDB,
};
