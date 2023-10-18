"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { SearchIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LocalSearchbarProps {
  searchPlaceholder?: string;
  className?: string;
  searchParams?: string;
}

export function LocalSearchbar({
  className,
  searchPlaceholder = "Search...",
}: LocalSearchbarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentSearch, setCurrentSearch] = useState("");
  const { debouncedValue } = useDebounce(currentSearch, 500);

  const currentSearchParam = searchParams.get("search");

  useEffect(() => {
    if (currentSearchParam) {
      setCurrentSearch(currentSearchParam ?? "");
    }
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedValue) {
      newParams.set("search", debouncedValue);
    } else {
      newParams.delete("search");
    }

    router.push(`?${newParams.toString()}`);
  }, [debouncedValue, router, searchParams]);

  return (
    <div className={cn("relative h-auto flex-1", className)}>
      <SearchIcon
        className="absolute left-2 top-1/2 -translate-y-1/2"
        width={20}
        height={20}
      />

      <Input
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
        placeholder={searchPlaceholder}
        className="h-full border-none bg-background-lighter p-2 pl-10 shadow-none"
      />
    </div>
  );
}
