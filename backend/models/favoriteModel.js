import { db } from "../config/firebase.js";

export const createFavorite = (userId, city) =>
  db.collection("favorites").add({ userId, city, createdAt: new Date() });

export const findFavoritesByUser = async (userId) => {
  const snapshot = await db
    .collection("favorites")
    .where("userId", "==", userId)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const removeFavorite = (id) =>
  db.collection("favorites").doc(id).delete();