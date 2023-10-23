"use server";
import { Notification } from "@prisma/client";
import { NotificationEvent } from "../event";
import { prisma } from "../prismaClient";
import { currentUser } from "@clerk/nextjs";
import { PaginationParams } from "@/types";
import { PaginationSchema } from "../validation";
import { revalidateTag } from "next/cache";

export async function createNewNotification(
  notificationData: Pick<
    Notification,
    "userId" | "data" | "actionHref" | "action"
  >,
): Promise<Notification> {
  const { userId, data, actionHref, action } = notificationData;

  const notification = await prisma.notification.create({
    data: {
      data: JSON.stringify(data),
      actionHref,
      action,
      user: {
        connect: {
          clerkId: userId,
        },
      },
    },
  });

  NotificationEvent.getInstance()?.emitNotification(notification);

  return notification;
}

export async function getNotificationList({
  page,
  limit,
  status = "all",
}: PaginationParams & {
  status?: "read" | "unread" | "all";
}): Promise<Notification[]> {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("You must be logged in to get notification list");
  }

  const parsedParams = PaginationSchema.parse({
    page,
    pageSize: limit,
  });

  const notifications = await prisma.notification.findMany({
    where: {
      userId: authUser.id,
      read: status === "read" ? true : status === "unread" ? false : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: parsedParams.pageSize,
    skip: (parsedParams.page - 1) * parsedParams.pageSize,
  });

  return notifications;
}

export async function removeReadNotifications() {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("You must be logged in to remove read notifications");
  }

  await prisma.notification.deleteMany({
    where: {
      userId: authUser.id,
      read: true,
    },
  });
}

export async function markNotificationAsRead(notificationId: number) {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("You must be logged in to mark notification as read");
  }

  await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
}

export async function markAllNotificationsAsRead() {
  const authUser = await currentUser();

  if (!authUser) {
    throw new Error("You must be logged in to mark all notifications as read");
  }

  await prisma.notification.updateMany({
    where: {
      userId: authUser.id,
      read: false,
    },
    data: {
      read: true,
    },
  });

  revalidateTag(`my-notification`);
}
