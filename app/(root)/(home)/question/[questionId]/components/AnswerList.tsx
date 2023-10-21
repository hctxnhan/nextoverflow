import { Filter } from "@/components/shared/filter/Filter";
import { LOCAL_SEARCH_FILTER_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { AnswerCard } from "./AnswerCard";
import { getAnswerOfQuestion } from "@/lib/actions/answer.actions";
import { Pagination } from "@/components/shared/pagination/Pagination";

interface AnswerListProps {
  questionId: number;
  className?: string;
  page?: number;
}

export async function AnswerList({
  questionId,
  className,
  page,
}: AnswerListProps) {
  const { answers, totalPage } = await getAnswerOfQuestion({
    questionId,
    page,
    limit: 5,
  });

  return (
    <div className={cn(className)}>
      <div className="flex-between -mb-4 gap-2">
        <p>
          {answers.length} Answer{answers.length > 1 && "s"}
        </p>
        <Filter
          className="w-[200px] bg-background-darker"
          options={LOCAL_SEARCH_FILTER_OPTIONS.answers}
        />
      </div>
      <div className="mt-10 flex flex-col gap-8">
        {answers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>

      <Pagination total={totalPage} />
    </div>
  );
}
