export const getChallengesByCode = (code) => {
  // Sunny / Clear
  if ([1000].includes(code)) return [
    "Capture a perfect shadow",
    "Find golden hour reflections",
    "Shoot silhouettes against the sky",
    "Photograph light rays through leaves",
  ];
  // Partly cloudy
  if ([1003, 1006].includes(code)) return [
    "Frame a building with dramatic clouds",
    "Capture city life in soft diffused light",
    "Find interesting cloud formations",
    "Shoot street portraits in even light",
  ];
  // Overcast
  if ([1009].includes(code)) return [
    "Find interesting textures on surfaces",
    "Capture muted color palettes",
    "Shoot minimalist urban scenes",
    "Photograph people under grey skies",
  ];
  // Mist / Fog
  if ([1030, 1135, 1147].includes(code)) return [
    "Capture mysterious foggy landscapes",
    "Find silhouettes disappearing in mist",
    "Shoot layered depth with fog",
    "Photograph lights glowing through haze",
  ];
  // Rain / Drizzle
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195].includes(code)) return [
    "Find reflections in puddles",
    "Capture rain drops on glass",
    "Shoot moody wet street scenes",
    "Photograph umbrellas and raincoats",
  ];
  // Thunderstorm
  if ([1087, 1273, 1276].includes(code)) return [
    "Capture dramatic stormy skies",
    "Find shelter and shoot the storm",
    "Photograph people rushing in the rain",
    "Shoot lightning if safe to do so",
  ];
  // Snow
  if ([1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225].includes(code)) return [
    "Capture footprints in fresh snow",
    "Find frozen textures and patterns",
    "Shoot minimalist winter scenes",
    "Photograph snow falling against dark bg",
  ];
  // Default
  return [
    "Find an interesting perspective",
    "Capture local street life",
    "Photograph light and shadow",
    "Find beauty in ordinary objects",
  ];
};