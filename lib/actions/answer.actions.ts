"use server";

import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { revalidatePath } from "next/cache";
import { PaginationParams } from "@/types";
import { PaginationSchema } from "../validation";
import { createNewNotification } from "./notification.actions";
import { getCurrentUser } from "./user.actions";
import { shortenContent } from "../utils";

export type ParentAnswerDetail = Awaited<
  ReturnType<typeof getAnswerOfQuestion>
>["answers"][number];

export type ReplyAnswerDetail = Omit<ParentAnswerDetail, "_count">;
export type AnswerDetail = ReplyAnswerDetail & {
  _count?: {
    replies: number;
  };
};

export async function createAnswer(params: {
  body: string;
  questionId: number;
}) {
  const authUser = await getCurrentUser();

  if (!authUser) {
    throw new Error("You must be logged in to create an answer");
  }

  const answer: Prisma.AnswerCreateInput = {
    author: {
      connect: {
        clerkId: authUser.clerkId,
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

  const answerDetail = await prisma.answer.findUnique({
    where: {
      id: result.id,
    },
    select: {
      author: {
        select: {
          username: true,
          name: true,
        },
      },
      question: {
        select: {
          id: true,
          title: true,
          authorId: true,
        },
      },
    },
  });

  if (answerDetail && answerDetail?.question.authorId) {
    createNewNotification({
      userId: answerDetail.question.authorId,
      data: {
        title: `${authUser!.name} answered your question: ${shortenContent(
          answerDetail.question.title,
        )}`,
        content: shortenContent(params.body),
      },
      action: "Go to question",
      actionHref: `/question/${answerDetail.question.id}`,
    });
  }

  revalidatePath(`/question/${params.questionId}`);

  return result;
}

export async function getAnswerOfQuestion({
  page,
  limit = 10,
  questionId,
}: PaginationParams & {
  questionId: number;
}) {
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

  const getAnswers = prisma.answer.findMany({
    where: {
      questionId,
      parentId: null,
    },
    select: {
      author: {
        select: {
          clerkId: true,
          picture: true,
          username: true,
          name: true,
        },
      },
      votes: true,
      question: {
        select: {
          id: true,
        },
      },
      id: true,
      content: true,
      createdAt: true,
      _count: {
        select: {
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
    take: parsedParams.pageSize,
  });

  const getTotalAnswers = prisma.answer.count({
    where: {
      questionId,
      parentId: null,
    },
  });

  const [answers, totalAnswers] = await Promise.all([
    getAnswers,
    getTotalAnswers,
  ]);

  const totalPage = Math.ceil(totalAnswers / parsedParams.pageSize);

  return {
    answers,
    totalPage,
  };
}

// export async function getAnswerById(id: number) {
//   const authUser = await currentUser();

//   const answer = await prisma.answer.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       votes: authUser
//         ? {
//             select: {
//               userId: true,
//               voteType: true,
//             },
//             where: {
//               userId: authUser.id,
//             },
//           }
//         : undefined,
//     },
//   });

//   return answer;
// }

export async function replyToAnswer({
  parentAnswerId,
  content,
}: {
  parentAnswerId: number;
  content: string;
}) {
  const authUser = await getCurrentUser();
  if (!authUser) {
    throw new Error("You must be logged in to reply to an answer");
  }

  const parentAnswer = await prisma.answer.findUnique({
    where: {
      id: parentAnswerId,
    },
  });

  if (!parentAnswer || parentAnswer.parentId !== null) {
    throw new Error("Invalid parent answer");
  }

  const reply: Prisma.AnswerCreateInput = {
    author: {
      connect: {
        clerkId: authUser.clerkId,
      },
    },
    content,
    question: {
      connect: {
        id: parentAnswer.questionId,
      },
    },
    parent: {
      connect: {
        id: parentAnswerId,
      },
    },
  };

  const result = await prisma.answer.create({
    data: reply,
  });

  await createNewNotification({
    userId: parentAnswer.authorId,
    data: {
      title: `${authUser!.name} replied to your answer: ${shortenContent(
        parentAnswer.content,
      )}`,

      content: shortenContent(content),
    },
    action: "Go to question",
    actionHref: `/question/${parentAnswer.questionId}`,
  });

  revalidatePath(`/question/${parentAnswer.questionId}`);

  return result;
}

export async function getReplyOfAnswer({
  answerId,
  page,
  limit = 5,
}: PaginationParams & { answerId: number }) {
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

  return prisma.answer.findMany({
    where: {
      parentId: answerId,
    },
    select: {
      author: {
        select: {
          picture: true,
          username: true,
          name: true,
        },
      },
      votes: true,
      question: {
        select: {
          id: true,
        },
      },
      id: true,
      content: true,
      createdAt: true,
    },
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
    take: parsedParams.pageSize,
  });
}

async function isAnswerBelongToCurrentUser(answerId: number) {
  const authUser = await currentUser();
  if (!authUser) return false;

  const answer = await prisma.answer.findUnique({
    where: {
      id: answerId,
    },
    select: {
      authorId: true,
    },
  });

  if (!answer) return false;

  return answer.authorId === authUser.id;
}

export async function deleteAnswer(answerId: number) {
  const isBelongToCurrentUser = await isAnswerBelongToCurrentUser(answerId);

  if (!isBelongToCurrentUser) {
    throw new Error("You don't have permission to delete this answer");
  }

  const answer = await prisma.answer.delete({
    where: {
      id: answerId,
    },
  });

  revalidatePath(`/question/${answer.questionId}`);

  return answer;
}
