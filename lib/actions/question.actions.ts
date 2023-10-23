"use server";

import { PaginationParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prismaClient";
import { PaginationSchema } from "../validation";

export type QuestionInHomepage = Awaited<
  ReturnType<typeof getQuestions>
>["questions"][number];
export type QuestionInDetail = NonNullable<
  Awaited<ReturnType<typeof getQuestionById>>
>;

export async function getQuestionsByIds(ids: number[]) {
  return prisma.question.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function getQuestions({
  limit,
  page,
  search = "",
  filter = "newest",
}: PaginationParams) {
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

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

  const getQuestions = prisma.question.findMany({
    where,
    orderBy,
    select: {
      author: { select: { username: true, picture: true, name: true } },
      tags: { select: { name: true } },
      id: true,
      views: true,
      title: true,
      createdAt: true,
      _count: {
        select: {
          answers: {
            where: {
              parentId: null,
            },
          },
          votes: {
            where: {
              voteType: "UPVOTE",
            },
          },
        },
      },
    },
    take: parsedParams.pageSize,
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
  });

  const countQuestions = prisma.question.count({
    where,
  });

  const [questions, total] = await prisma.$transaction([
    getQuestions,
    countQuestions,
  ]);

  const totalPage = Math.ceil(total / parsedParams.pageSize);

  return {
    questions,
    total,
    totalPage,
  };
}

export async function getSavedQuestions({
  limit,
  page,
  search = "",
  filter = "most-recent",
}: PaginationParams) {
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

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

  const where: Prisma.UserSavedQuestionWhereInput = {
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
  };

  const getSavedQuestion = prisma.userSavedQuestion.findMany({
    include: {
      question: {
        include: {
          author: { select: { username: true, picture: true, name: true } },
          tags: { select: { name: true } },
          _count: {
            select: {
              answers: true,
              votes: {
                where: {
                  voteType: "UPVOTE",
                },
              },
            },
          },
        },
      },
    },
    where,
    orderBy,
    take: parsedParams.pageSize,
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
  });

  const getCount = prisma.userSavedQuestion.count({
    where,
  });

  const [questions, total] = await prisma.$transaction([
    getSavedQuestion,
    getCount,
  ]);

  const totalPage = Math.ceil(total / parsedParams.pageSize);

  return {
    questions,
    total,
    totalPage,
  };
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
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

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
          votes: {
            where: {
              voteType: "UPVOTE",
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: parsedParams.pageSize,
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
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

export async function viewQuestion(questionId: number) {
  return prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
