import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
export function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="flex-center rounded-md bg-background-darker px-3 py-1">
        <SearchIcon width={20} height={20} />

        <Input
          placeholder="Search anything..."
          className="no-focus border-none shadow-none"
        />
      </div>
    </div>
  );
}
