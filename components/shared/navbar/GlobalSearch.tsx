import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
export function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="relative h-auto">
        <SearchIcon
          className="absolute left-2 top-1/2 -translate-y-1/2"
          width={20}
          height={20}
        />

        <Input
          placeholder="Search anything..."
          className="h-full border-none bg-background-darker p-2 pl-10 shadow-none"
        />
      </div>
    </div>
  );
}
