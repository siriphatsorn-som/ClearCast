import * as WeatherModel from "../models/weatherModel.js";

export const getPhotoScore = async (req, res) => {
  try {
    const result = await WeatherModel.fetchWeatherByCity(req.query.city);

    const data = result.data;

    let score = 10;
    if (data.current.cloud > 70) score -= 3;
    if (data.current.humidity > 80) score -= 2;

    res.json({
      score,
      condition: score > 7 ? "Good for photography" : "Not ideal",
    });
  } catch (err) {
    res.status(500).json({ error: "Photo score failed" });
  }
};