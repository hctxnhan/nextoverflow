import { Filter } from "@/components/shared/filter/Filter";
import { LOCAL_SEARCH_FILTER_OPTIONS } from "@/constants";
import { getAnswerOfQuestion } from "@/lib/actions/answer.actions";
import "server-only";
import { AnswerCard } from "./AnswerCard";

interface AnswerListProps {
  questionId: number;
}

export const preload = (questionId: number) =>
  // eslint-disable-next-line no-void
  void getAnswerOfQuestion(questionId);

export async function AnswerList({ questionId }: AnswerListProps) {
  const answers = await getAnswerOfQuestion(questionId);

  return (
    <div className="mt-10">
      <div className="flex-between -mb-4 gap-2">
        <p>
          {answers.length} Answer{answers.length > 1 && "s"}
        </p>
        <Filter
          className="w-[200px] bg-background-darker"
          options={LOCAL_SEARCH_FILTER_OPTIONS.answers}
        />
      </div>
      {answers.map((answer, index) => (
        <>
          <hr className="my-8" />
          <AnswerCard key={answer.id} answer={answer} />
        </>
      ))}
    </div>
  );
}
