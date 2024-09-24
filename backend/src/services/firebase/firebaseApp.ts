import admin from "firebase-admin";
import fireBaseKey from "../../config/fireBaseKeyConfig";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = fireBaseKey as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
