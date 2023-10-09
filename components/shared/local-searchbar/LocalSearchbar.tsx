import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { SearchIcon } from "lucide-react";

interface LocalSearchbarProps {
  searchPlaceholder?: string;
  className?: string;
}

export function LocalSearchbar({
  className,
  searchPlaceholder = "Search...",
}: LocalSearchbarProps) {
  return (
    <div className={cn("relative h-auto flex-1", className)}>
      <SearchIcon
        className="absolute left-2 top-1/2 -translate-y-1/2"
        width={20}
        height={20}
      />

      <Input
        placeholder={searchPlaceholder}
        className="h-full border-none bg-background-lighter p-2 pl-10 shadow-none"
      />
    </div>
  );
}
