"use client";

import { Button } from "@/components/ui/button";
import {
  ReplyAnswerDetail,
  getReplyOfAnswer,
} from "@/lib/actions/answer.actions";
import { useEffect, useState } from "react";
import { ReplyCard } from "./ReplyCard";

interface ReplyAnswerProps {
  answerId: number;
  totalReply: number;
}

export function ReplyAnswer({ answerId, totalReply }: ReplyAnswerProps) {
  const [answers, setAnswers] = useState<ReplyAnswerDetail[]>([]);
  const [page, setPage] = useState(0);

  const canLoadMore = totalReply > answers.length;

  async function handleLoadMore() {
    const nextPage = page + 1;
    const newAnswers = await getReplyOfAnswer({
      answerId,
      page: nextPage,
      limit: 5,
    });

    const newAnswersList = [...answers, ...newAnswers];
    setAnswers(newAnswersList);
    setPage(nextPage);
  }

  useEffect(() => {
    handleLoadMore();
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {answers.map((answer, index) => (
        <ReplyCard key={answer.id} answer={answer} />
      ))}
      {canLoadMore && (
        <Button onClick={handleLoadMore} variant={"link"}>
          Load more
        </Button>
      )}
    </div>
  );
}
