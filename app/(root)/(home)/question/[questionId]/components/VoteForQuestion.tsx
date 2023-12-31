import { getQuestionById } from "@/lib/actions/question.actions";
import {
  countVoteOfQuestion,
  handleVoteQuestion,
} from "@/lib/actions/vote.actions";
import { VoteType } from "@prisma/client";
import { ArrowUpSquareIcon } from "lucide-react";
import { VoteButton } from "./VoteButton";

interface VoteForQuestionProps {
  questionId: number;
}

export async function VoteForQuestion({ questionId }: VoteForQuestionProps) {
  const getQuestion = getQuestionById(questionId);
  const getVoteCount = countVoteOfQuestion(questionId);

  const [question, vote] = await Promise.all([getQuestion, getVoteCount]);

  if (!question) return null;

  const currentUserVote = question.votes?.length > 0 ? question.votes[0] : null;

  const handleUpvote = handleVoteQuestion.bind(null, {
    questionId: question.id,
    voteType: VoteType.UPVOTE,
  });

  const handleDownvote = handleVoteQuestion.bind(null, {
    questionId: question.id,
    voteType: VoteType.DOWNVOTE,
  });

  const downVoteCount =
    vote.find((vote) => vote.voteType === VoteType.DOWNVOTE)?._count || 0;

  const upVoteCount =
    vote.find((vote) => vote.voteType === VoteType.UPVOTE)?._count || 0;

  return (
    <div className="mt-1 flex flex-col items-center gap-1">
      <form className="leading-none" action={handleUpvote}>
        <VoteButton
          userVote={currentUserVote?.voteType}
          voteType={VoteType.UPVOTE}
        >
          <ArrowUpSquareIcon />
        </VoteButton>
      </form>
      <p className="base-medium text-foreground">
        {upVoteCount - downVoteCount}
      </p>
      <form className="leading-none" action={handleDownvote}>
        <VoteButton
          userVote={currentUserVote?.voteType}
          voteType={VoteType.DOWNVOTE}
        >
          <ArrowUpSquareIcon className="rotate-180" />
        </VoteButton>
      </form>
    </div>
  );
}
