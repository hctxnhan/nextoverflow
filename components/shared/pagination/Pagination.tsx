"use client";

import { Button } from "@/components/ui/button";
import { parsePaginationParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  total: number;
}

export function Pagination({ total }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { page } = parsePaginationParams(searchParams);

  const voidItem = "...";

  function calculateShowPageItems() {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5, voidItem, total];
    }

    if (page >= total - 2) {
      return [1, voidItem, total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, voidItem, page - 1, page, page + 1, voidItem, total];
  }

  function handleChangePage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > total) return () => {};

    return () => {
      const newParams = new URLSearchParams(searchParams);

      newParams.set("page", pageNumber.toString() ?? 1);

      router.push(`?${newParams.toString()}`);
    };
  }

  const handleBack = handleChangePage(page - 1);
  const handleNext = handleChangePage(page + 1);

  if (total <= 1) return null;

  console.log(page);

  return (
    <div className="flex-center gap-2">
      <Button disabled={page === 1} variant={"outline"} onClick={handleBack}>
        Back
      </Button>
      {calculateShowPageItems().map((item, index) => (
        <Button
          key={index}
          variant={item === page ? "default" : "outline"}
          onClick={
            item === voidItem ? undefined : handleChangePage(item as number)
          }
        >
          {item}
        </Button>
      ))}
      <Button
        disabled={page === total}
        variant={"outline"}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
}
