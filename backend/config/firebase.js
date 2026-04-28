import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
   storageBucket: `${process.env.FIREBASE_PROJECT_ID}`,
});

export const db = admin.firestore();