import { getQuestionsByIds } from "@/lib/actions/question.actions";
import { useAsyncAction } from "@/lib/useFetch";
import { cn, shortenContent } from "@/lib/utils";
import { Question } from "@prisma/client";
import Link from "next/link";
import { useEffect } from "react";

export function SimilarityQuestionList({
  similarQuestions,
}: {
  similarQuestions: [string, number][];
}) {
  const {
    start,
    isLoading,
    data: questions,
  } = useAsyncAction(getQuestionsByIds);

  useEffect(() => {
    start([similarQuestions.map((q) => Number(q[0]))]);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!questions) return <p>Something went wrong</p>;

  const mapQuestionToSimilarity = similarQuestions.map((q) => [
    q[0],
    q[1],
    questions.find((question: Question) => question.id === Number(q[0])),
  ]);

  return (
    <div className="flex max-h-96 flex-col gap-2 overflow-y-auto">
      {mapQuestionToSimilarity.map((entry) => {
        const question = entry[2] as Question;
        const similarPercentage =
          (similarQuestions.find((q) => q[0] === String(question.id))?.[1] ||
            0) * 100;

        return (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`/question/${question.id}`}
            key={question.id}
            className={cn(
              "hover space-y-2 rounded-md bg-background-darker/70 px-4 py-3 text-foreground hover:bg-background-darker",
              {
                "bg-destructive/50 hover:bg-destructive/60":
                  similarPercentage >= 85,
                "bg-orange-500/50 hover:bg-orange-500/60":
                  similarPercentage > 70 && similarPercentage < 85,
                "bg-yellow-500/50 hover:bg-yellow-500/60":
                  similarPercentage > 50 && similarPercentage <= 70,
              },
            )}
          >
            <p className="base-semibold">
              {shortenContent(question.title, 200)}
            </p>
            <p className="text-foreground-lighter">
              {shortenContent(question.content, 200)}
            </p>
            <p>Similarity: {similarPercentage.toFixed(0)}%</p>
          </Link>
        );
      })}
    </div>
  );
}
