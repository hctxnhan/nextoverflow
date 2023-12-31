import { AnswerDetail } from "@/lib/actions/answer.actions";
import {
  countVoteOfAnswer,
  handleVoteQuestion,
} from "@/lib/actions/vote.actions";
import { VoteType } from "@prisma/client";
import { ArrowUpSquareIcon } from "lucide-react";
import { VoteButton } from "./VoteButton";

interface VoteForAnswerProps {
  answer: AnswerDetail;
}

export async function VoteForAnswer({ answer }: VoteForAnswerProps) {
  const vote = await countVoteOfAnswer(answer.id);

  if (!answer) return null;

  const currentUserVote = answer.votes?.length > 0 ? answer.votes[0] : null;

  const handleUpvote = handleVoteQuestion.bind(null, {
    questionId: answer.question.id,
    answerId: answer.id,
    voteType: VoteType.UPVOTE,
  });

  const handleDownvote = handleVoteQuestion.bind(null, {
    questionId: answer.question.id,
    answerId: answer.id,
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
      <p className="paragraph-medium text-foreground">
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
