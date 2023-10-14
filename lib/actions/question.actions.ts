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
  filter = "newest",
}: PaginationParams) {
  let orderBy: Prisma.QuestionOrderByWithRelationInput = { createdAt: "desc" };
  let where: Prisma.QuestionWhereInput = {
    OR: [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
      { tags: { some: { name: { contains: search, mode: "insensitive" } } } },
    ],
  };

  switch (filter) {
    case "popular":
      orderBy = {
        answers: {
          _count: "desc",
        },
      };
      break;
    case "unanswered":
      where = {
        ...where,
        answers: {
          none: {},
        },
      };
      break;
    default:
      break;
  }

  const questions = await prisma.question.findMany({
    where,
    orderBy,
    include: {
      author: { select: { username: true, picture: true, name: true } },
      tags: { select: { name: true } },
      _count: {
        select: {
          answers: true,
        },
      },
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  return questions;
}

export async function getSavedQuestions({
  limit = 10,
  page = 1,
  search = "",
  filter = "most-recent",
}: PaginationParams) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("You must be logged in to create a question");
  }

  let orderBy: Prisma.UserSavedQuestionOrderByWithRelationInput = {
    createdAt: "desc",
  };

  switch (filter) {
    case "most-voted":
      orderBy = {
        question: {
          votes: {
            _count: "desc",
          },
        },
      };
      break;
    case "most-answered":
      orderBy = {
        question: {
          answers: {
            _count: "desc",
          },
        },
      };
      break;
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;
    default:
      break;
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
      question: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
          {
            tags: { some: { name: { contains: search, mode: "insensitive" } } },
          },
        ],
      },
    },
    orderBy,
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
      content: params.body.trim(),
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
      content: params.body.trim(),
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

export async function getQuestionByTagId({
  tagId,
  search = "",
  limit,
  page,
}: { tagId: string } & PaginationParams) {
  return prisma.question.findMany({
    where: {
      tags: {
        some: {
          name: tagId,
        },
      },
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ],
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
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
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
