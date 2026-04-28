export default function PhotoChallengeSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex flex-col gap-1.5">
        <div className="h-6 w-36 rounded-full bg-(--bg-card)" />
        <div className="h-4 w-64 rounded-full bg-(--bg-card)" />
      </div>
      <div className="h-48 rounded-2xl bg-(--bg-card)" />
      <div className="h-64 rounded-2xl bg-(--bg-card)" />
    </div>
  );
}