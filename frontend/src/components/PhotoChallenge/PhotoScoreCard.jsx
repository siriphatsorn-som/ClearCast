import { FiMapPin } from "react-icons/fi";

const getPhotoQuote = (score, condition) => {
  const c = condition?.toLowerCase() ?? "";

  if (score >= 9)
    return "🌟 Perfect conditions! The light is magical right now. Go shoot!";
  if (score >= 7) {
    if (c.includes("cloud"))
      return "☁️ Soft diffused light — ideal for portraits and street photography.";
    if (c.includes("sun") || c.includes("clear"))
      return "☀️ Golden hour is calling. Chase that light!";
    return "📸 Great conditions! Get your camera ready.";
  }
  if (score >= 5) {
    if (c.includes("wind"))
      return "💨 Windy but workable. Try capturing motion blur or flying objects.";
    if (c.includes("cloud"))
      return "🌤️ Decent light. Watch for harsh shadows midday.";
    return "🙂 Not bad! Look for interesting compositions to work with.";
  }
  if (score >= 3) {
    if (c.includes("rain"))
      return "🌧️ Rainy day? Perfect for reflections in puddles and moody street shots.";
    if (c.includes("fog") || c.includes("mist"))
      return "🌫️ Foggy conditions create mysterious and dramatic scenes.";
    return "😐 Challenging light today. Try experimenting with shadows or contrast.";
  }
  if (c.includes("rain"))
    return "🌧️ Tough conditions, but rain brings unique opportunities — try shooting through wet glass!";
  if (c.includes("storm"))
    return "⛈️ Stay safe first. Dramatic stormy skies can make incredible shots from shelter.";
  return "😔 Difficult conditions today. A great time to plan your next shoot!";
};

export default function PhotoScoreCard({ photo, condition, location }) {
  const quote = getPhotoQuote(photo.score, condition);

  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border) flex flex-col gap-3">
      <div className="flex flex-row gap-2 justify-between items-center">
        <h1 className="text-(--text-primary) font-semibold">Photo Score</h1>
        <div className="flex flex-row gap-2 items-center justify-center py-1.5 px-3 bg-(--bg-input)  rounded-xl">
          <FiMapPin size={12} className="text-(--text-primary)" />
          <p className="text-(--text-primary) text-xs font-bold">
            {location.name}, {location.country}
          </p>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-bold text-(--text-primary)">
          {photo.score}
          <span className="text-lg font-normal text-(--text-muted)">/10</span>
        </p>
        <p className="text-(--text-secondary) text-lg">: {photo.condition}</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-(--bg-input) rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${photo.score * 10}%`,
            background:
              photo.score >= 7
                ? "#f59e0b"
                : photo.score >= 4
                  ? "#3b82f6"
                  : "#6b7280",
          }}
        />
      </div>

      {/* Quote */}
      <h3 className="text-(--text-secondary) text-sm italic border-l-2 border-(--border) pl-3">
        {quote}
      </h3>
    </div>
  );
}
