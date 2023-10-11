import { prisma } from "../prismaClient";

export type TagInTagsPage = Awaited<ReturnType<typeof getAllTags>>[0];

export async function getAllTags() {
  const tags = await prisma.tag.findMany({
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
