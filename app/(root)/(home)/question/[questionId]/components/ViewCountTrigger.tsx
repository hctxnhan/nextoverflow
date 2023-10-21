"use client";

import { viewQuestion } from "@/lib/actions/question.actions";
import { ReactNode, useEffect } from "react";

export function ViewCountTrigger({
  questionId,
  children,
}: {
  questionId: number;
  children: ReactNode;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      viewQuestion(questionId);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
