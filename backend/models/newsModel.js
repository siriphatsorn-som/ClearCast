import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 1800 });

export const fetchNewsByCity = async (city) => {
  const key = `news:${city.toLowerCase()}`;

  if (cache.has(key)) return cache.get(key);

  const url = `https://gnews.io/api/v4/search?q=weather+${city}&token=${process.env.NEWS_KEY}&lang=en`;
  const response = await fetch(url);
  const data = await response.json();

  const articles = data.articles ?? [];
  cache.set(key, articles);
  return articles;
};