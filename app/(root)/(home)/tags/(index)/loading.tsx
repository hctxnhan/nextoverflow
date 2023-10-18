import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">All tags</h1>
      <Skeleton className="min-h-[40px] w-full flex-1" />

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="shadow-on-hover flex flex-col gap-3 
            rounded-md bg-background-light p-4"
            >
              <Skeleton className="h-6" />
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
