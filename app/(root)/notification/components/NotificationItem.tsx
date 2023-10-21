import { markNotificationAsRead } from "@/lib/actions/notification.actions";
import { Notification } from "@prisma/client";
import { Dot } from "lucide-react";
import Link from "next/link";

type NotificationItemProps = Omit<Notification, "data"> & {
  data: {
    title: string;
    content: string;
  };
};

export function NotificationItem(notification: NotificationItemProps) {
  function handleNotificationClick() {
    markNotificationAsRead(notification.id);
  }

  return (
    <Link
      onClick={handleNotificationClick}
      href={notification.actionHref || "#"}
      className="w-[400px] rounded-md bg-background-darker p-4 hover:bg-background-darker/70"
      key={notification.id}
    >
      <p className="small-regular line-clamp-3 text-foreground-light">
        {!notification.read && (
          <Dot
            width={30}
            height={30}
            className="-my-2 -ml-3 -mr-1 inline-block text-primary"
          />
        )}
        {notification.data?.title}
      </p>
      <p className="small-medium line-clamp-2 text-foreground-lighter">
        {notification.data?.content}
      </p>
    </Link>
  );
}
