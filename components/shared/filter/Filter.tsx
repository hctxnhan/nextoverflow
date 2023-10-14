"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterProps {
  options: {
    label: string;
    value: string;
  }[];
  defaultFilter?: string;
  filterPlaceholder?: string;
  className?: string;
}

export function Filter({
  options,
  className,
  defaultFilter,
  filterPlaceholder = "Select a Filter",
}: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentFilter, setCurrentFilter] = useState(defaultFilter ?? "");
  const currentFilterParam = searchParams.get("filter");

  useEffect(() => {
    if (currentFilterParam) {
      setCurrentFilter(currentFilterParam ?? "");
    }
  }, []);

  useEffect(() => {
    if (defaultFilter) {
      setCurrentFilter(defaultFilter);
    }
  }, [defaultFilter]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (currentFilter) {
      newParams.set("filter", currentFilter);
    } else {
      newParams.delete("filter");
    }

    router.push(`?${newParams.toString()}`);
  }, [currentFilter, router, searchParams]);

  return (
    <Select
      value={currentFilter}
      onValueChange={(value) => setCurrentFilter(value)}
    >
      <SelectTrigger
        className={cn(
          "h-full w-fit border-none bg-background-lighter",
          className,
        )}
      >
        <SelectValue className="h-full" placeholder={filterPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
