import { NoResult } from "@/components/shared/no-result/NoResult";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { NO_RESULT_PROPS } from "@/constants";
import { getQuestions } from "@/lib/actions/question.actions";
import { SearchParamsProps } from "@/types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { HomeFilter } from "./components/HomeFilter";
import { QuestionCard } from "./components/QuestionCard";

export default async function Home({ searchParams }: SearchParamsProps) {
  const { search, filter, page, limit } = searchParams;

  const data = await getQuestions({
    page,
    limit,
    search,
    filter,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex-between">
        <h1 className="h1-bold max-sm:h2-bold">All questions</h1>
        <Link href="/ask-question">
          <Button className="pr-2">
            Ask a Question
            <PlusIcon className="ml-2" width={20} height={20} />
          </Button>
        </Link>
      </div>
      <HomeFilter />

      {data.questions.length > 0 ? (
        <div className="flex flex-col gap-8">
          {data.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
          <Pagination total={data.totalPage} />
        </div>
      ) : (
        <NoResult className="mt-8" {...NO_RESULT_PROPS.home} />
      )}
    </div>
  );
}
