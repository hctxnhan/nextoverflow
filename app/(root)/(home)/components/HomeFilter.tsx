"use client";

import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { LOCAL_SEARCH_FILTER_OPTIONS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function HomeFilter() {
  const searchParams = useSearchParams();
  const currentFilterParam = searchParams.get("filter");
  const [currentFilter, setCurrentFilter] = useState(currentFilterParam ?? "newest");

  function handleFilterChange(value: string) {
    return () => {
      setCurrentFilter(value);
    };
  }

  return (
    <div className="flex gap-2 lg:flex-col">
      <LocalSearchbar className="flex-1" />
      <Filter
        className="w-[200px] lg:hidden"
        options={LOCAL_SEARCH_FILTER_OPTIONS.question}
        defaultFilter={currentFilter}
      />
      <div className="flex flex-wrap gap-1 max-lg:hidden">
        {LOCAL_SEARCH_FILTER_OPTIONS.question.map((option) => (
          <Button
            onClick={handleFilterChange(option.value)}
            key={option.value}
            variant={currentFilterParam === option.value ? "default" : "outline"}
            className="text-sm"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
