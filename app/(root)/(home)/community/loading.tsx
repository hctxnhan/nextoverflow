import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">All users</h1>

      <div className="flex gap-2">
        <Skeleton className="min-h-[40px] w-full flex-1" />
        <Skeleton className="min-h-[40px] w-[200px]" />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-center shadow-on-hover animate-pulse flex-col gap-2 rounded-xl bg-background-light p-6"
          >
            <Skeleton className="h-[100px] w-[100px] rounded-full" />
            <Skeleton className="h-[20px] w-[150px]" />
            <Skeleton className="h-[20px] w-[150px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
