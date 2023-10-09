import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HOME_FILTER_OPTIONS } from "@/constants";

export function HomeFilter() {
  return (
    <div className="flex gap-2 lg:flex-col">
      <LocalSearchbar className="flex-1" />
      <Filter
        className="max-w-[200px] lg:hidden"
        options={HOME_FILTER_OPTIONS}
      />
      <div className="flex flex-wrap gap-1 max-lg:hidden">
        {HOME_FILTER_OPTIONS.map((option) => (
          <Button key={option.value} variant={"outline"} className="text-sm">
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
