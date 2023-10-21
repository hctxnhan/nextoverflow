import { SignedIn } from "@clerk/nextjs";
import { AnswerForm } from "./components/AnswerForm";

export default function Page({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const questionIdNumber = parseInt(questionId);

  return (
    <SignedIn>
      <AnswerForm className="mb-8" questionId={questionIdNumber} />
    </SignedIn>
  );
}
