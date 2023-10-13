import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { LOCAL_SEARCH_FILTER_OPTIONS } from "@/constants";

export function HomeFilter() {
  return (
    <div className="flex gap-2 lg:flex-col">
      <LocalSearchbar className="flex-1" />
      <Filter
        className="w-[200px] lg:hidden"
        options={LOCAL_SEARCH_FILTER_OPTIONS.question}
      />
      <div className="flex flex-wrap gap-1 max-lg:hidden">
        {LOCAL_SEARCH_FILTER_OPTIONS.question.map((option) => (
          <Button key={option.value} variant={"outline"} className="text-sm">
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
