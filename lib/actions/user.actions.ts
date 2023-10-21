"use server";

import { PaginationParams, SortOrder } from "@/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "../prismaClient";
import { PaginationSchema } from "../validation";
import { currentUser } from "@clerk/nextjs";

interface UserOperationParams {
  username: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export type UserProfile = NonNullable<
  Awaited<ReturnType<typeof getUserProfile>>
>;

export type UserBasicInfo = NonNullable<
  Awaited<ReturnType<typeof getUserById>>
>;

export async function getUserById({
  clerkId,
}: Pick<UserOperationParams, "clerkId">) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      clerkId: true,
      username: true,
      name: true,
      picture: true,
      email: true,
      joinedAt: true,
      bio: true,
    },
  });

  return user;
}

export async function getCurrentUser() {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("User not logged in");
  }

  return getUserById({ clerkId: authUser.id });
}

export async function createUser({
  clerkId,
  email,
  firstName,
  lastName,
  picture,
  username,
}: UserOperationParams) {
  const existingUser = await getUserById({ clerkId });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user: Prisma.UserCreateInput = {
    clerkId,
    email,
    name: `${firstName} ${lastName}`.trim(),
    picture,
    username,
  };

  const result = await prisma.user.create({ data: user });

  return result;
}

export async function updateUser({
  clerkId,
  data,
}: {
  clerkId: string;
  data: Partial<Omit<UserOperationParams, "clerkId">>;
}) {
  const user = await getUserById({ clerkId });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { clerkId },
    data: {
      ...user,
      ...data,
    },
  });

  revalidatePath(`/profile/${user.username}`);

  return updatedUser;
}

export async function deleteUser({
  clerkId,
}: Pick<UserOperationParams, "clerkId">) {
  const user = await getUserById({ clerkId });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({ where: { clerkId } });

  revalidatePath(`/profile/${user.username}`);

  return user;
}

export async function getAllUsers({
  limit,
  page,
  filter = "new-users",
  search = "",
}: PaginationParams) {
  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

  let orderBy: Prisma.UserOrderByWithRelationInput = {
    joinedAt: SortOrder.DESC,
  };

  switch (filter) {
    case "old-users":
      orderBy = {
        joinedAt: SortOrder.ASC,
      };
      break;
    case "top-contributors":
      orderBy = {
        answers: {
          _count: SortOrder.DESC,
        },
      };
      break;
    default:
      break;
  }

  const users = await prisma.user.findMany({
    orderBy,
    select: {
      clerkId: true,
      username: true,
      name: true,
      picture: true,
      email: true,
      joinedAt: true,
    },
    where: {
      OR: [
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
    take: parsedParams.pageSize,
  });

  return users;
}

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      clerkId: true,
      username: true,
      name: true,
      picture: true,
      joinedAt: true,
      bio: true,
      questions: {
        select: {
          id: true,
          views: true,
          title: true,
          tags: true,
          createdAt: true,
          author: {
            select: {
              clerkId: true,
              name: true,
              username: true,
              picture: true,
            },
          },
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
        take: 10,
        orderBy: {
          answers: {
            _count: SortOrder.DESC,
          },
        },
      },
      answers: {
        select: {
          id: true,
          content: true,
          question: {
            select: {
              title: true,
              tags: true,
              id: true,
              createdAt: true,
              author: {
                select: {
                  clerkId: true,
                  name: true,
                  username: true,
                  picture: true,
                },
              },
            },
          },
          _count: {
            select: {
              votes: {
                where: {
                  voteType: "UPVOTE",
                },
              },
              replies: true,
            },
          },
        },
        where: {
          parentId: null,
        },
        take: 10,
        orderBy: {
          votes: {
            _count: SortOrder.DESC,
          },
        },
      },
      _count: {
        select: {
          questions: true,
          answers: true,
        },
      },
    },
  });
}

export async function updateUserProfile(
  data: Partial<Omit<UserOperationParams, "clerkId">>
) {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("User not logged in");
  }

  return updateUser({
    clerkId: authUser.id,
    data,
  });
}