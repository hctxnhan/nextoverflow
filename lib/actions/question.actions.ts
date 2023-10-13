"use server";

import { PaginationParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prismaClient";
import { LOCAL_SEARCH_FILTER_OPTIONS } from "@/constants";
import { Prisma } from "@prisma/client";

export type QuestionInHomepage = Awaited<ReturnType<typeof getQuestions>>[0];
export type QuestionInDetail = NonNullable<
  Awaited<ReturnType<typeof getQuestionById>>
>;

export async function getQuestions({
  limit = 10,
  page = 1,
  search = "",
  filter = "newest",
}: PaginationParams<
  (typeof LOCAL_SEARCH_FILTER_OPTIONS)["question"][number]["value"]
>) {
  let orderBy: Prisma.QuestionOrderByWithRelationInput = { createdAt: "desc" };

  switch (filter) {
    case "popular":
      orderBy = {
        answers: {
          _count: "desc",
        },
      };
      break;
    default:
      break;
  }

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
        },
      },
    },
    orderBy,
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
            },
          },
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
  questionId?: number;
}) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create a question");
  }

  await prisma.question.upsert({
    where: {
      id: params.questionId ?? -1,
    },
    update: {
      title: params.title,
      content: params.body,
      tags: {
        deleteMany: {},
        connectOrCreate: params.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    create: {
      title: params.title,
      content: params.body,
      author: {
        connect: {
          clerkId: authUser.id,
        },
      },
      tags: {
        connectOrCreate: params.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });

  revalidatePath(`/`);
  redirect(`/`);
}

export async function getQuestionById(id: number) {
  const authUser = await currentUser();

  const question = await prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      tags: true,
      votes: authUser
        ? {
            select: {
              userId: true,
              voteType: true,
            },
            where: {
              userId: authUser?.id,
            },
          }
        : undefined,
      _count: {
        select: {
          // get saved by user if logged in
          savedBy: {
            where: {
              userId: authUser?.id,
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

export async function getQuestionByTagId({ tagId }: { tagId: string }) {
  return prisma.question.findMany({
    where: {
      tags: {
        some: {
          name: tagId,
        },
      },
    },
    include: {
      author: true,
      tags: true,
      _count: {
        select: {
          answers: true,
        },
      },
    },
  });
}

export async function isQuestionBelongToCurrentUser(questionId: number) {
  const authUser = await currentUser();
  if (!authUser) return false;

  const question = await prisma.question.findFirst({
    where: {
      id: questionId,
      authorId: authUser.id,
    },
  });

  return !!question;
}

export async function deleteQuestion(questionId: number) {
  const isOwner = await isQuestionBelongToCurrentUser(questionId);
  if (!isOwner) throw new Error("You are not the owner of this question");

  await prisma.question.delete({
    where: {
      id: questionId,
    },
  });

  revalidatePath(`/`);
  redirect(`/`);
}

export async function getTopQuestions() {
  return prisma.question.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      answers: {
        _count: "desc",
      },
    },
    take: 5,
  });
}

export async function getTopTags() {
  return prisma.tag.findMany({
    select: {
      name: true,
    },
    orderBy: {
      questions: {
        _count: "desc",
      },
    },
    take: 10,
  });
}
