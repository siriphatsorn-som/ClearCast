const FALLBACK_CITIES = [
  // Asia
  "Bangkok", "Tokyo", "Beijing", "Shanghai", "Seoul", "Singapore",
  "Mumbai", "Delhi", "Jakarta", "Manila", "Kuala Lumpur", "Ho Chi Minh City",
  "Taipei", "Hong Kong", "Karachi", "Dhaka", "Colombo", "Kathmandu",

  // Middle East
  "Dubai", "Riyadh", "Doha", "Kuwait City", "Tehran", "Istanbul",
  "Tel Aviv", "Beirut", "Amman", "Baghdad",

  // Europe
  "London", "Paris", "Berlin", "Madrid", "Rome", "Amsterdam",
  "Brussels", "Vienna", "Zurich", "Stockholm", "Oslo", "Copenhagen",
  "Helsinki", "Warsaw", "Prague", "Budapest", "Lisbon", "Athens",
  "Kyiv", "Moscow", "Dublin",

  // Americas
  "New York", "Los Angeles", "Chicago", "Toronto", "Vancouver",
  "Mexico City", "São Paulo", "Rio de Janeiro", "Buenos Aires",
  "Lima", "Bogotá", "Santiago", "Caracas", "Havana",

  // Africa
  "Cairo", "Lagos", "Nairobi", "Johannesburg", "Cape Town",
  "Casablanca", "Accra", "Addis Ababa", "Dar es Salaam", "Kinshasa",

  // Oceania
  "Sydney", "Melbourne", "Brisbane", "Auckland", "Perth",
];

export const getRandomCities = (count = 3, excludeCity = null) => {
  const filtered = excludeCity
    ? FALLBACK_CITIES.filter((c) => c.toLowerCase() !== excludeCity.toLowerCase())
    : FALLBACK_CITIES;
  return [...filtered].sort(() => Math.random() - 0.5).slice(0, count);
};

export { FALLBACK_CITIES };