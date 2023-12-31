"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import {
  markAllNotificationsAsRead,
  removeReadNotifications,
} from "@/lib/actions/notification.actions";
import { cn } from "@/lib/utils";
import { Notification } from "@prisma/client";
import { BellIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NotificationItem } from "./NotificationItem";

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  async function loadMore(
    page: number,
    filter: "all" | "read" | "unread",
    previousList: Notification[],
  ) {
    if (isFetching) return;

    setIsFetching(true);

    const searchParams = new URLSearchParams({
      page: page.toString(),
      filter,
      limit: "5",
    });

    const res = await fetch(`/api/my-notification?${searchParams}`, {
      next: {
        revalidate: 5,
        tags: ["my-notification"],
      },
    });
    const newNotifications = (await res.json()).data;
    setNotifications([
      ...previousList,
      ...newNotifications.map((item: Notification) => ({
        ...item,
        data: JSON.parse(item.data as string),
      })),
    ]);

    setIsFetching(false);

    if (newNotifications.length < 4) {
      setHasMore(false);
    }
  }

  function onChangeFilter(value: "all" | "read" | "unread") {
    setFilter(value);
    setPage(1);
    setNotifications([]);
    loadMore(1, value, []);
  }

  function onLoadMoreButtonClick() {
    loadMore(page + 1, filter, notifications);
    setPage((page) => page + 1);
  }

  function handleMarkAllAsReadButtonClick() {
    markAllNotificationsAsRead();

    setNotifications((notifications) =>
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }

  function handleRemoveReadNotificationsButtonClick() {
    removeReadNotifications();

    setNotifications((notifications) =>
      notifications.filter((notification) => !notification.read),
    );
  }

  useEffect(() => {
    loadMore(1, filter, []);
  }, []);

  useEffect(() => {
    const source = new EventSource("/api/notification");

    source.addEventListener("message", (event) => {
      const notification: Notification = JSON.parse(event.data);
      notification.data = JSON.parse(notification.data as string);

      setNotifications((notifications) => [notification, ...notifications]);

      const notificationData = notification.data as {
        title: string;
        content: string;
      };

      toast({
        title: notificationData.title,
        description: notificationData.content,
        action: notification.actionHref ? (
          <Link href={notification.actionHref}>
            <Button className="border-white" variant={"outline"}>
              {notification.action}
            </Button>
          </Link>
        ) : undefined,
      });
    });

    source.addEventListener("error", (event) => {
      source.close();
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon height={20} width={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-2 mt-1 w-fit p-2">
        <RadioGroup
          className="my-2 flex justify-end gap-4"
          value={filter}
          onValueChange={onChangeFilter}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-notification" />
            <Label htmlFor="all-notification">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="read" id="only-read" />
            <Label htmlFor="only-read">Read</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unread" id="only-unread" />
            <Label htmlFor="only-unread">Unread</Label>
          </div>
        </RadioGroup>

        <div
          className={cn(
            "flex max-h-[500px] flex-col gap-2 overflow-y-auto",
            isFetching && "justify-center overflow-hidden",
          )}
        >
          {notifications.map((notification) => (
            // @ts-ignore TODO: Fix this
            <NotificationItem key={notification.id} {...notification} />
          ))}
          {isFetching && (
            <Loader2Icon
              height={30}
              width={30}
              className="my-2 animate-spin self-center text-foreground-light"
            />
          )}
        </div>
        <div className="flex-center mt-2 flex-col">
          {hasMore && !isFetching && (
            <Button
              onClick={onLoadMoreButtonClick}
              variant={"link"}
              className="small-regular"
            >
              Load more
            </Button>
          )}
          <Button
            onClick={handleMarkAllAsReadButtonClick}
            variant={"link"}
            className="small-regular"
          >
            Mark all as read
          </Button>
          <Button
            onClick={handleRemoveReadNotificationsButtonClick}
            variant={"link"}
            className="small-regular"
          >
            Remove all read notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
