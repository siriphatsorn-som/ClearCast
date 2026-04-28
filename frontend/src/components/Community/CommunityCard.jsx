export default function CommunityCard({ entry }) {
  return (
    <div className="flex flex-col bg-(--bg-card) rounded-2xl border border-(--border) overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={entry.imageURL}
          alt={entry.conditionLabel}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "[placehold.co](https://placehold.co/400x400?text=No+Image)";
          }}
        />
        <span className="absolute top-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
          {entry.conditionLabel}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {entry.photoURL ? (
            <img
              src={entry.photoURL}
              className="w-6 h-6 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-(--bg-input) flex items-center justify-center text-xs text-(--text-secondary)">
              {entry.displayName?.[0] ?? "?"}
            </div>
          )}
          <p className="text-(--text-primary) text-xs font-medium truncate">
            {entry.displayName}
          </p>
        </div>

        {entry.city && (
          <p className="text-(--text-secondary) text-xs">📍 {entry.city}</p>
        )}
        {entry.note && (
          <p className="text-(--text-secondary) text-xs italic line-clamp-2">
            {entry.note}
          </p>
        )}
      </div>
    </div>
  );
}
