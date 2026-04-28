import { db } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const reviewsRef = db.collection("reviews");

export const getReviewsByCity = async (city) => {
  const snapshot = await reviewsRef.where("city", "==", city.toLowerCase()).get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addReview = async ({ city, userId, displayName, photoURL, rating, comment }) => {
  const ref = await reviewsRef.add({
    city: city.toLowerCase(),
    userId, displayName, photoURL,
    rating, comment,
    createdAt: FieldValue.serverTimestamp(),
  });
  return { id: ref.id };
};

export const updateReview = async (id, userId, { rating, comment }) => {
  const ref = reviewsRef.doc(id);
  const doc = await ref.get();
  if (!doc.exists || doc.data().userId !== userId) throw new Error("Not found or unauthorized");
  await ref.update({ rating, comment });
};

export const deleteReview = async (id, userId) => {
  const ref = reviewsRef.doc(id);
  const doc = await ref.get();
  if (!doc.exists || doc.data().userId !== userId) throw new Error("Not found or unauthorized");
  await ref.delete();
};