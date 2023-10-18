import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">Saved questions</h1>

      <div className="flex gap-2">
        <Skeleton className="min-h-[40px] w-full flex-1" />
        <Skeleton className="min-h-[40px] w-[200px]" />
      </div>

      <div className="flex flex-col gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton className="min-h-[100px] w-full flex-1" key={i} />
        ))}
      </div>
    </div>
  );
}
