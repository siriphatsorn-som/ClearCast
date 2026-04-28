import * as FavoriteModel from "../models/favoriteModel.js";

export const addFavorite = async (req, res) => {
  const userId = req.user?.uid ?? "test-user";
  const doc = await FavoriteModel.createFavorite(userId, req.body.city);
  res.json({ id: doc.id, city: req.body.city });
};

export const getFavorites = async (req, res) => {
  const userId = req.user?.uid ?? "test-user";
  const data = await FavoriteModel.findFavoritesByUser(userId);
  res.json(data);
};

export const deleteFavorite = async (req, res) => {
  await FavoriteModel.removeFavorite(req.params.id);
  res.json({ message: "Deleted" });
};