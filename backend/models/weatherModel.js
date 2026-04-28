import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

export const fetchWeatherByCity = async (city, days = 7) => {
  const key = `weather:${city.toLowerCase()}:${days}`;
  if (cache.has(key)) return { data: cache.get(key) }; 

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${city}&days=${days}`;
  const response = await fetch(url);
  const data = await response.json();

  cache.set(key, data);
  return { data };
};