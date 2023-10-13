"use server";
import { currentUser } from "@clerk/nextjs";
import { VoteType } from "@prisma/client";
import { prisma } from "../prismaClient";
import { revalidatePath } from "next/cache";
import { VoteSchema } from "../validation";

export type CountVoteOfQuestion = Awaited<
  ReturnType<typeof countVoteOfQuestion>
>;

export async function countVoteOfQuestion(questionId: number) {
  const result = await prisma.vote.groupBy({
    by: ["voteType"],
    where: { questionId },
    _count: true,
  });

  return result;
}

export async function countVoteOfAnswer(answerId: number) {
  const result = await prisma.vote.groupBy({
    by: ["voteType"],
    where: { answerId },
    _count: true,
  });

  return result;
}

export async function handleVoteQuestion({
  questionId,
  voteType,
  answerId,
}: {
  questionId: number;
  voteType: VoteType;
  answerId?: number;
}) {
  VoteSchema.parse({
    questionId,
    voteType,
    answerId,
  });

  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("Not authenticated");
  }

  const vote = await prisma.vote.findFirst({
    where: {
      questionId,
      answerId,
      userId: authUser.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteType) {
      const updatedVote = await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      revalidatePath(`/question/${questionId}`);
      return updatedVote;
    } else {
      const updatedVote = await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType,
        },
      });

      revalidatePath(`/question/${questionId}`);
      return updatedVote;
    }
  } else {
    const newVote = await prisma.vote.create({
      data: {
        userId: authUser.id,
        questionId,
        answerId,
        voteType,
      },
    });

    revalidatePath(`/question/${questionId}`);
    return newVote;
  }
}
