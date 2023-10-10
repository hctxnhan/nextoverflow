"use server";

import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";

export async function createUser(params: { username: string }) {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("Current user is not logged in");
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: authUser.id },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user: Prisma.UserCreateInput = {
    clerkId: authUser.id,
    email: authUser.emailAddresses[0].emailAddress,
    name: `${authUser.firstName} ${authUser.lastName}`.trim(),
    picture: authUser.imageUrl,
    username: params.username,
  };

  await prisma.user.create({ data: user });
}
