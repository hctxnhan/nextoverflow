"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { revalidatePath } from "next/cache";
import { PaginationParams, SortOrder } from "@/types";

interface UserOperationParams {
  username: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export async function getUserById({
  clerkId,
}: Pick<UserOperationParams, "clerkId">) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      username: true,
      name: true,
      picture: true,
      email: true,
      joinedAt: true,
    },
  });

  return user;
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

export async function getAllUsers(
  params: {
    sortBy: "joinedAt" | "name" | "contributions";
    sortOrder: SortOrder;
  } & PaginationParams,
) {
  const users = await prisma.user.findMany({
    orderBy: {
      [params.sortBy]: params.sortOrder,
    },
    select: {
      username: true,
      name: true,
      picture: true,
      email: true,
      joinedAt: true,
    },
    where: {
      username: params.search ? { contains: params.search } : undefined,
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
  });

  return users;
}
