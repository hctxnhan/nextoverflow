"use client";

import { viewQuestion } from "@/lib/actions/question.actions";
import { useLocalStorage } from "@/lib/hooks";
import { ReactNode, useEffect } from "react";

export function ViewCountTrigger({
  questionId,
  children,
}: {
  questionId: number;
  children: ReactNode;
}) {
  const { storedValue: viewedQuestions, setValue: setViewdQuestions } =
    useLocalStorage<number[]>("viewed_questions", []);

  useEffect(() => {
    if (viewedQuestions.includes(questionId)) return;

    const timer = setTimeout(() => {
      viewQuestion(questionId);
      setViewdQuestions([...viewedQuestions, questionId]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [questionId]);

  return <>{children}</>;
}
