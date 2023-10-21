import { getQuestionById } from "@/lib/actions/question.actions";
import { NoQuestionFound } from "./components/NoQuestionFound";
import { ViewCountTrigger } from "./components/ViewCountTrigger";
import { ReactNode } from "react";

export default async function Layout({
  params: { questionId },
  children,
  answer,
  detail,
}: {
  params: { questionId: string };
  children: ReactNode;
  answer: ReactNode;
  detail: ReactNode;
}) {
  const questionIdNumber = parseInt(questionId);

  if (isNaN(questionIdNumber)) return <NoQuestionFound />;

  const questionDetails = await getQuestionById(questionIdNumber);

  if (!questionDetails) return <NoQuestionFound />;

  return (
    <ViewCountTrigger questionId={questionIdNumber}>
      {detail}
      {children}
      {answer}
    </ViewCountTrigger>
  );
}
