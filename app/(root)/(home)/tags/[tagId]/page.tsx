import { NoResult } from "@/components/shared/no-result/NoResult";
import { NO_RESULT_PROPS } from "@/constants";
import { getQuestionByTagId } from "@/lib/actions/question.actions";
import { QuestionCard } from "../../components/QuestionCard";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";

export default async function Page({
  params: { tagId },
}: {
  params: { tagId: string };
}) {
  const questions = await getQuestionByTagId({ tagId });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">Questions tagged [{tagId}]</h1>

      {questions.length > 0 ? (
        <>
          <div className="flex gap-2">
            <LocalSearchbar className="flex-1" />
          </div>
          <div className="flex flex-col gap-8">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </>
      ) : (
        <NoResult className="mt-8" {...NO_RESULT_PROPS.tagDetail} />
      )}
    </div>
  );
}
