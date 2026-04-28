import { WEATHER_COLLECTION } from "../../utils/weatherCollection";

export default function CommunityFilter({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      <button
        onClick={() => setActiveFilter(null)}
        className={`shrink-0 px-3 py-1.5 rounded-full text-sm border transition-colors ${
          !activeFilter
            ? "bg-(--text-primary) text-(--bg-primary) border-(--text-primary)"
            : "bg-(--bg-input) text-(--text-secondary) border-(--border)"
        }`}
      >
        All
      </button>

      {WEATHER_COLLECTION.map((w) => (
        <button
          key={w.key}
          onClick={() => setActiveFilter(activeFilter === w.key ? null : w.key)}
          className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
            activeFilter === w.key
              ? "bg-(--text-primary) text-(--bg-primary) border-(--text-primary)"
              : "bg-(--bg-input) text-(--text-secondary) border-(--border)"
          }`}
        >
          {w.emoji} {w.label}
        </button>
      ))}
    </div>
  );
}
