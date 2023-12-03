import { getQuestionById } from "@/lib/actions/question.actions";
import { NoQuestionFound } from "./components/NoQuestionFound";
import { ReactNode } from "react";

export default async function Layout({
  params: { questionId },
  children,
}: {
  params: { questionId: string };
  children: ReactNode;
}) {
  const questionIdNumber = parseInt(questionId);

  if (isNaN(questionIdNumber)) return <NoQuestionFound />;

  const questionDetails = await getQuestionById(questionIdNumber);

  if (!questionDetails) return <NoQuestionFound />;

  return <>{children}</>;
}
