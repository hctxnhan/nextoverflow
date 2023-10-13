import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { TagCard } from "./components/TagCard";
import { LOCAL_SEARCH_FILTER_OPTIONS, NO_RESULT_PROPS } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.actions";

export default async function Page() {
  const allTags = await getAllTags();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">All tags</h1>

      <div className="flex gap-2">
        <LocalSearchbar className="flex-1" />
        <Filter
          className="w-[200px]"
          options={LOCAL_SEARCH_FILTER_OPTIONS.tags}
        />
      </div>

      <section>
        {allTags.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {allTags.map((tag) => (
              <TagCard tag={tag} key={tag.name} />
            ))}
          </div>
        ) : (
          <NoResult
            className="mt-8"
            {...NO_RESULT_PROPS.tags}
          />
        )}
      </section>
    </div>
  );
}
