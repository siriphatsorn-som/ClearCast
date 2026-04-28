import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const collectionRef = (userId) =>
  db.collection("photoCollection").doc(userId).collection("entries");

export const getCollection = async (userId) => {
  const snapshot = await collectionRef(userId).get();
  return snapshot.docs.map((d) => ({ key: d.id, ...d.data() }));
};

export const upsertEntry = async (userId, key, { conditionCode, conditionLabel, city, imageURL, note, displayName, photoURL }) => {
  await collectionRef(userId).doc(key).set({
    conditionKey: key,
    conditionCode, conditionLabel, city,
    imageURL, note: note ?? "",
    displayName: displayName ?? "",
    photoURL: photoURL ?? null,
    capturedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
};

export const updateEntry = async (userId, key, { note }) => {
  const ref = collectionRef(userId).doc(key);
  const doc = await ref.get();
  if (!doc.exists) throw new Error("Entry not found");
  await ref.update({ note });
};

export const deleteEntry = async (userId, key) => {
  const ref = collectionRef(userId).doc(key);
  const doc = await ref.get();
  if (!doc.exists) throw new Error("Entry not found");
  await ref.delete();
};

export const getCommunityEntries = async (limit = 20) => {
  const snapshot = await db.collectionGroup("entries").get();

  return snapshot.docs
    .map((d) => ({ key: d.id, userId: d.ref.parent.parent.id, ...d.data() }))
    .filter((e) => e.imageURL)
    .sort((a, b) => (b.capturedAt?.seconds ?? 0) - (a.capturedAt?.seconds ?? 0))
    .slice(0, limit);
};

export const getCommunityByCondition = async (conditionKey, limit = 20) => {
  const validKeys = ["sunny", "cloudy", "foggy", "rainy", "stormy", "snowy", "hail", "blizzard"];
  if (!validKeys.includes(conditionKey)) {
    throw new Error(`Invalid condition key: ${conditionKey}`);
  }

  try {
    const snapshot = await db.collectionGroup("entries")
      .where("conditionKey", "==", conditionKey)
      .orderBy("capturedAt", "desc")
      .limit(limit)
      .get();

    return snapshot.docs
      .map((d) => ({ key: d.id, userId: d.ref.parent.parent.id, ...d.data() }))
      .filter((d) => d.imageURL);
  } catch (err) {
    console.error("Firestore error:", err.message); // ดู error จริง
    throw err;
  }
};