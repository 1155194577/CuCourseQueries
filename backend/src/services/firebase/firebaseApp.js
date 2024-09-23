import admin from "firebase-admin";
import fireBaseKey from "../../config/fireBaseKeyConfig.js";
admin.initializeApp({
  credential: admin.credential.cert(fireBaseKey),
});

export const db = admin.firestore();
