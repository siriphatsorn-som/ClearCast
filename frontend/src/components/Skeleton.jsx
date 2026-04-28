export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-(--bg-input) rounded-xl ${className}`}
    />
  );
}