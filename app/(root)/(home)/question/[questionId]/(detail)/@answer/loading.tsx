import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="rounded-md bg-background p-8 max-sm:p-4">
      <div className="flex flex-col gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className={"rounded-md border border-background-darker p-4"}
          >
            <div className="body-regular mb-4 flex items-center">
              <Skeleton className="mr-2 h-[30px] w-[30px] rounded-full" />
              <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col">
                <div className="flex-1 gap-2 space-y-2 rounded-md">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
