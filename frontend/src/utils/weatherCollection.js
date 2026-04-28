export const WEATHER_COLLECTION = [
  { key: "sunny",    label: "Sunny",        emoji: "🌤️", codes: [1000] },
  { key: "cloudy",   label: "Cloudy",       emoji: "☁️",  codes: [1003, 1006, 1009] },
  { key: "foggy",    label: "Fog / Mist",   emoji: "🌁",  codes: [1030, 1135, 1147] },
  { key: "rainy",    label: "Rainy",        emoji: "🌧️", codes: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246] },
  { key: "stormy",   label: "Thunderstorm", emoji: "⛈️", codes: [1087, 1273, 1276, 1279, 1282] },
  { key: "snowy",    label: "Snowy",        emoji: "❄️",  codes: [1066, 1069, 1072, 1114, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252, 1255, 1258] },
  { key: "hail",     label: "Hail",         emoji: "🧊",  codes: [1237, 1261, 1264] },
  { key: "blizzard", label: "Blizzard",     emoji: "🌬️", codes: [1117] },
];

export const getConditionKey = (code) =>
  WEATHER_COLLECTION.find((w) => w.codes.includes(code))?.key ?? "sunny";

export const getConditionByKey = (key) =>
  WEATHER_COLLECTION.find((w) => w.key === key);

export const getWeatherEmoji = (code) =>
  WEATHER_COLLECTION.find((w) => w.codes.includes(code))?.emoji ?? "🌡️";