import * as WeatherModel from "../models/weatherModel.js";

export const getWeather = async (req, res) => {
  try {
    const { data } = await WeatherModel.fetchWeatherByCity(req.query.city);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
};