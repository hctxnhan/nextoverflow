import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex-between">
        <h1 className="h1-bold max-sm:h2-bold">All questions</h1>
        <Link href="/ask-question">
          <Button className="pr-2">
            Ask a Question
            <PlusIcon className="ml-2" width={20} height={20} />
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 lg:flex-col">
        <Skeleton className="min-h-[40px] w-full flex-1" />
        <Skeleton className="min-h-[40px] w-[200px] lg:hidden" />
        <div className="flex flex-wrap gap-1 max-lg:hidden">
          <Skeleton className="min-h-[40px] w-[150px]" />
          <Skeleton className="min-h-[40px] w-[150px]" />
          <Skeleton className="min-h-[40px] w-[150px]" />
          <Skeleton className="min-h-[40px] w-[150px]" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton className="min-h-[100px] w-full flex-1" key={i} />
        ))}
      </div>
    </div>
  );
}
