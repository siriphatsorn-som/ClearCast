import * as ReviewModel from "../models/reviewModel.js";

export const getReviews = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "city is required" });

    const reviews = await ReviewModel.getReviewsByCity(city.toLowerCase());
    res.json(reviews);
  } catch (err) {
    console.error("getReviews error:", err.message); 
    res.status(500).json({ error: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { city, rating, comment } = req.body;
    const { uid, name, picture } = req.user;
    const result = await ReviewModel.addReview({
      city, userId: uid,
      displayName: name,
      photoURL: picture,
      rating, comment,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    await ReviewModel.updateReview(req.params.id, req.user.uid, { rating, comment });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await ReviewModel.deleteReview(req.params.id, req.user.uid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};