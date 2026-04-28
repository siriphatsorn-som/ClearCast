import Skeleton from "../Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-72" />
      <Skeleton className="h-72" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-36" />
    </div>
  );
}