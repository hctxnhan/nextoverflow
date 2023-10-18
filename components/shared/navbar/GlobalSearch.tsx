"use client";

import { Input } from "@/components/ui/input";
import { globalSearch } from "@/lib/actions/globalSearch.actions";
import { GlobalSearchResult as IGlobalSearchResult } from "@/types";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { GlobalSearchResult } from "./GlobalSearchResult";
import { useClickOutside, useDebounce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function GlobalSearch({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const { debouncedValue, loading: debounceLoading } = useDebounce(search, 500);
  const [results, setResults] = useState<IGlobalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  const searchContainerRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchContainerRef, () => setShowResult(false));

  useEffect(() => {
    setIsLoading(true);
    setResults([]);
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue) {
      startTransition(async () => {
        const result = await globalSearch(debouncedValue);
        setResults(result);
        setIsLoading(false);
      });
    }
  }, [debouncedValue]);

  return (
    <div
      className={cn("relative w-full max-w-[600px]", className)}
      ref={searchContainerRef}
    >
      <SearchIcon
        className="absolute left-2 top-1/2 -translate-y-1/2"
        width={20}
        height={20}
      />
      <Input
        value={search}
        onFocus={() => setShowResult(true)}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anything..."
        className="h-full border-none bg-background-darker p-2 pl-10 shadow-none"
      />
      <GlobalSearchResult
        isLoading={isLoading || debounceLoading}
        searchTerm={search}
        open={showResult}
        result={results}
      />
    </div>
  );
}
