import { getQuestionById } from "@/lib/actions/question.actions";
import { SignedIn } from "@clerk/nextjs";
import { AnswerForm } from "./components/AnswerForm";
import { AnswerList, preload } from "./components/AnswerList";
import { NoQuestionFound } from "./components/NoQuestionFound";
import { QuestionDetail } from "./components/QuestionDetail";

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
      <div className="mb-8 rounded-md bg-background p-8 max-sm:mb-4 max-sm:p-4">
        <QuestionDetail questionId={questionIdNumber} />
      </div>
      <div className="rounded-md bg-background p-8 max-sm:p-4">
        <SignedIn>
          <AnswerForm className="mb-8" questionId={questionIdNumber} />
        </SignedIn>
        <AnswerList questionId={questionIdNumber} />
      </div>
    </>
  );
}
