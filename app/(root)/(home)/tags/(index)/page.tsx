import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { NO_RESULT_PROPS } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.actions";
import { SearchParamsProps } from "@/types";
import { TagCard } from "../components/TagCard";
import { Pagination } from "@/components/shared/pagination/Pagination";

export default async function Page({ searchParams }: SearchParamsProps) {
  const data = await getAllTags({
    search: searchParams.search,
    page: searchParams.page,
    limit: searchParams.limit ?? '12',
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">All tags</h1>
      <LocalSearchbar className="flex-1" />

      <section>
        {data.tags.length > 0 ? (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-4">
              {data.tags.map((tag) => (
                <TagCard tag={tag} key={tag.name} />
              ))}
            </div>
            <Pagination total={data.totalPage} />
          </div>
        ) : (
          <NoResult className="mt-8" {...NO_RESULT_PROPS.tags} />
        )}
      </section>
    </div>
  );
}
