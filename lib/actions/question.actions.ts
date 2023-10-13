"use server";

import { PaginationParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prismaClient";

export type QuestionInHomepage = Awaited<ReturnType<typeof getQuestions>>[0];
export type QuestionInDetail = NonNullable<
  Awaited<ReturnType<typeof getQuestionById>>
>;

export async function getQuestions({
  limit = 10,
  page = 1,
  search = "",
  filter = "",
}: PaginationParams) {
  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { tags: { some: { name: { contains: search, mode: "insensitive" } } } },
      ],
    },
    include: {
      author: { select: { username: true, picture: true, name: true } },
      tags: { select: { name: true } },
      _count: {
        select: {
          answers: true,
        }
      }
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  return questions;
}

export async function getSavedQuestions({
  limit = 10,
  page = 1,
  search = "",
  filter = "",
}: PaginationParams) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create a question");
  }

  const questions = await prisma.userSavedQuestion.findMany({
    include: {
      question: {
        include: {
          author: { select: { username: true, picture: true, name: true } },
          tags: { select: { name: true } },
          _count: {
            select: {
              answers: true,
            }
          }
        },
      },
    },
    where: {
      userId: authUser.id,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  return questions;
}

export async function createQuestion(params: {
  title: string;
  body: string;
  tags: string[];
}) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create a question");
  }

  const question: Prisma.QuestionCreateInput = {
    title: params.title,
    author: { connect: { clerkId: authUser.id } },
    content: params.body,
    tags: {
      connectOrCreate: params.tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      })),
    },
  };

  await prisma.question.create({
    data: question,
    include: { author: true, tags: true },
  });

  revalidatePath(`/`);
  redirect(`/`);
}

export async function getQuestionById(id: number) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create a question");
  }

  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      author: true,
      tags: true,
      votes: {
        select: {
          userId: true,
          voteType: true,
        },
        where: {
          userId: authUser.id,
        },
      },
      _count: {
        select: {
          savedBy: {
            where: {
              userId: authUser.id,
            },
          },
          answers: true,
        },
      },
    },
  });

  return question;
}

export async function handleSaveQuestion(questionId: number) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create a question");
  }

  const hasSaved = await prisma.userSavedQuestion.findFirst({
    where: {
      questionId,
      userId: authUser.id,
    },
  });

  if (hasSaved) return unsaveQuestion(questionId, authUser.id);
  else return saveQuestion(questionId, authUser.id);
}

async function saveQuestion(questionId: number, userId: string) {
  const result = await prisma.userSavedQuestion.create({
    data: {
      questionId,
      userId,
    },
  });

  revalidatePath(`/question/${questionId}`);
  return result;
}

async function unsaveQuestion(questionId: number, userId: string) {
  const result = await prisma.userSavedQuestion.deleteMany({
    where: {
      questionId,
      userId,
    },
  });

  revalidatePath(`/question/${questionId}`);
  return result;
}
