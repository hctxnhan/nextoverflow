"use server";
import { PaginationParams } from "@/types";
import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";
import { PaginationSchema } from "../validation";

export type TagInTagsPage = Awaited<ReturnType<typeof getAllTags>>["tags"][number];

export async function getAllTags({
  limit,
  page,
  search = "",
}: PaginationParams) {
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

  const query: Prisma.TagFindManyArgs = {
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
    take: parsedParams.pageSize,
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
  };

  const getTags = prisma.tag.findMany(query);
  const countTags = prisma.tag.count({
    where: query.where,
  });

  const [tags, count] = await prisma.$transaction([getTags, countTags]);
  const totalPage = Math.ceil(count / parsedParams.pageSize);

  return {
    total: count,
    totalPage,
    tags,
  };
}
