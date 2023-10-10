"use server";

import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { redirect } from "next/navigation";
import { PaginationParams } from "@/types";
import { revalidatePath } from "next/cache";

export type QuestionInHomepage = Awaited<ReturnType<typeof getQuestions>>[0];

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
    select: {
      id: true,
      author: { select: { username: true, picture: true, name: true } },
      tags: { select: { name: true } },
      title: true,
      upvotes: true,
      downvotes: true,
      createdAt: true,
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
