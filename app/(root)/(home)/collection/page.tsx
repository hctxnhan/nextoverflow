import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { LOCAL_SEARCH_FILTER_OPTIONS, NO_RESULT_PROPS } from "@/constants";
import { getSavedQuestions } from "@/lib/actions/question.actions";
import { SearchParamsProps } from "@/types";
import { QuestionCard } from "../components/QuestionCard";

export default async function Page({ searchParams }: SearchParamsProps) {
  const data = await getSavedQuestions({
    page: searchParams.page,
    limit: searchParams.limit,
    search: searchParams.search,
    filter: searchParams.filter,
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">Saved questions</h1>
      <div className="flex gap-2">
        <LocalSearchbar className="flex-1" />
        <Filter
          defaultFilter="most-recent"
          className="w-[200px]"
          options={LOCAL_SEARCH_FILTER_OPTIONS.collection}
        />
      </div>

      {data.questions.length > 0 ? (
        <div className="flex flex-col gap-8">
          {data.questions.map((question) => (
            <QuestionCard
              key={question.questionId}
              question={question.question}
            />
          ))}
          <Pagination total={data.totalPage} />
        </div>
      ) : (
        <NoResult className="mt-8" {...NO_RESULT_PROPS.collection} />
      )}
    </div>
  );
}
