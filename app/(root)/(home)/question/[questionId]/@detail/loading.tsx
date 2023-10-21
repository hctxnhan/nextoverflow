import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mb-8 rounded-md bg-background p-8 max-sm:mb-4 max-sm:p-4">
      <div className="body-regular mb-2 flex items-center text-foreground-light">
        <Skeleton className="mr-2 h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-[150px]" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="mt-8 flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton className="h-6 w-full" key={i} />
        ))}
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  );
}
