"use client";

import { Button } from "@/components/ui/button";
import {
  ReplyAnswerDetail,
  getReplyOfAnswer,
} from "@/lib/actions/answer.actions";
import { useEffect, useState } from "react";
import { ReplyCard } from "./ReplyCard";
import { Loader2Icon } from "lucide-react";

interface ReplyAnswerProps {
  answerId: number;
  totalReply: number;
}

export function ReplyAnswer({ answerId, totalReply }: ReplyAnswerProps) {
  const [answers, setAnswers] = useState<ReplyAnswerDetail[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const canLoadMore = totalReply > answers.length;

  async function handleLoadMore() {
    const nextPage = page + 1;

    if (!canLoadMore) return;

    setIsFetching(true);
    const newAnswers = await getReplyOfAnswer({
      answerId,
      page: nextPage,
      limit: 5,
    });
    setIsFetching(false);

    const newAnswersList = [...answers, ...newAnswers];
    setAnswers(newAnswersList);
    if (newAnswersList.length < totalReply && newAnswers.length > 0) {
      setPage(nextPage);
    }
  }

  useEffect(() => {
    handleLoadMore();
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {answers.map((answer, index) => (
        <ReplyCard key={answer.id} answer={answer} />
      ))}
      {isFetching && (
        <div className="flex justify-center">
          <Loader2Icon className="h-6 w-6 animate-spin" />
        </div>
      )}
      {canLoadMore && !isFetching && (
        <Button onClick={handleLoadMore} variant={"link"}>
          Load more
        </Button>
      )}
    </div>
  );
}
