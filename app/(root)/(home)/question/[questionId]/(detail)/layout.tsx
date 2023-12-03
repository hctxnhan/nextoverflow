import { ReactNode } from "react";
import { ViewCountTrigger } from "../components/ViewCountTrigger";
import { SignedIn } from "@clerk/nextjs";
import { AnswerForm } from "../components/AnswerForm";

interface Props {
  children: ReactNode;
  answer: ReactNode;
  detail: ReactNode;
  params: { questionId: string };
}

export default function Layout({
  answer,
  detail,
  params: { questionId },
}: Props) {
  return (
    <ViewCountTrigger questionId={Number.parseInt(questionId)}>
      {detail}
      <SignedIn>
        <AnswerForm className="mb-8" questionId={Number.parseInt(questionId)} />
      </SignedIn>
      {answer}
    </ViewCountTrigger>
  );
}
