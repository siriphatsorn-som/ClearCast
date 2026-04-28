export default function ProgressBar({ collected, total }) {
  const pct = Math.round((collected / total) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-(--text-secondary)">
        <span>{collected}/{total} collected</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-(--bg-input) rounded-full h-1.5">
        <div
          className="bg-amber-400 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}