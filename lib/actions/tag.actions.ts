"use server";
import { PaginationParams } from "@/types";
import { prisma } from "../prismaClient";

export type TagInTagsPage = Awaited<ReturnType<typeof getAllTags>>[0];

export async function getAllTags({
  limit,
  page,
  search = "",
}: PaginationParams) {
  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      description: true,
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  return tags;
}
