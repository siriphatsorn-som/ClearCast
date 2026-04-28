import * as NewsModel from "../models/newsModel.js";

export const getNews = async (req, res) => {
  try {
    const articles = await NewsModel.fetchNewsByCity(req.query.city);
    res.json(articles.slice(0, 10));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "News fetch failed" });
  }
};