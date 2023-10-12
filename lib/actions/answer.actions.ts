"use server";

import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { revalidatePath } from "next/cache";

export type AnswerDetail = Awaited<ReturnType<typeof getAnswerOfQuestion>>[0];

export async function createAnswer(params: {
  body: string;
  questionId: number;
}) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create an answer");
  }

  const answer: Prisma.AnswerCreateInput = {
    author: {
      connect: {
        clerkId: authUser.id,
      },
    },
    content: params.body,
    question: {
      connect: {
        id: params.questionId,
      },
    },
  };

  const result = await prisma.answer.create({
    data: answer,
  });

  revalidatePath(`/question/${params.questionId}`);

  return result;
}

export async function getAnswerOfQuestion(questionId: number) {
  const answers = await prisma.answer.findMany({
    where: {
      questionId,
    },
    select: {
      author: {
        select: {
          picture: true,
          username: true,
          name: true,
        },
      },
      question: true,
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return answers;
}
