import { NoResult } from "@/components/shared/no-result/NoResult";
import { getQuestionById } from "@/lib/actions/question.actions";
import { SignedIn } from "@clerk/nextjs";
import { AnswerForm } from "./components/AnswerForm";
import { AnswerList, preload } from "./components/AnswerList";
import { QuestionDetail } from "./components/QuestionDetail";
import { NO_RESULT_PROPS } from "@/constants";

const NoQuestionFound = () => <NoResult {...NO_RESULT_PROPS.questionDetail} />;

export default async function Page({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const questionIdNumber = parseInt(questionId);

  if (isNaN(questionIdNumber)) return <NoQuestionFound />;

  const questionDetails = await getQuestionById(questionIdNumber);

  if (!questionDetails) return <NoQuestionFound />;

  preload(questionIdNumber);

  return (
    <>
      <div className="mb-8 rounded-md bg-background-lighter p-8">
        <QuestionDetail questionId={questionIdNumber} />
      </div>
      <div className="mb-8 rounded-md bg-background-lighter p-8">
        <SignedIn>
          <AnswerForm questionId={questionIdNumber} />
        </SignedIn>
        <AnswerList questionId={questionIdNumber} />
      </div>
    </>
  );
}
