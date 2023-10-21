import { QuestionDetail } from "../components/QuestionDetail";

export default function Page({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const questionIdNumber = parseInt(questionId);

  return (
    <div className="mb-8 rounded-md bg-background p-8 max-sm:mb-4 max-sm:p-4">
      <QuestionDetail questionId={questionIdNumber} />
    </div>
  );
}
