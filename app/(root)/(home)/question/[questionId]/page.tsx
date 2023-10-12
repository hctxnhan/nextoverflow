import { NoResult } from "@/components/shared/no-result/NoResult";
import { getQuestionById } from "@/lib/actions/question.actions";
import { QuestionDetail } from "./components/QuestionDetail";

const NoQuestionFound = () => (
  <NoResult
    title="You're lost"
    description="The question you're looking for doesn't exist. Maybe the question was deleted or the URL is incorrect. Please check the URL again or contact us if you think this is a mistake."
    actionText="Go back home"
    actionHref="/"
  />
);

export default async function Page({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const questionIdNumber = parseInt(questionId);

  if (isNaN(questionIdNumber)) return <NoQuestionFound />;

  const questionDetails = await getQuestionById(questionIdNumber);

  if (!questionDetails) return <NoQuestionFound />;

  return (
    <div className="mb-8 rounded-md bg-background-lighter p-8">
      <QuestionDetail question={questionDetails} />
    </div>
  );
}
