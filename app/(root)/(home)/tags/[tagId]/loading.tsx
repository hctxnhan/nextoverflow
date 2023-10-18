import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="gap-8 space-y-8">
      <Skeleton className="h-8 max-w-[300px] flex-1" />

      <Skeleton className="min-h-[40px] w-full flex-1" />

      <div className="flex flex-col gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton className="min-h-[100px] w-full flex-1" key={i} />
        ))}
      </div>
    </div>
  );
}
