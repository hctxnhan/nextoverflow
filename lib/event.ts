import { Notification } from "@prisma/client";
import { EventEmitter } from "events";

export class NotificationEvent extends EventEmitter {
  static getInstance() {
    if (!notificationEvent) {
      notificationEvent = new NotificationEvent();
    }
    return notificationEvent;
  }
  
  emitNotification(notification: Notification) {
    NotificationEvent.getInstance()?.emit("notification", notification);
  }
  
  subscribeNotification(callback: (notification: Notification) => void) {
    NotificationEvent.getInstance()?.on("notification", callback);
  }
  
  unsubscribeNotification(callback: (notification: Notification) => void) {
    NotificationEvent.getInstance()?.off("notification", callback);
  }
}

let notificationEvent: NotificationEvent | null = null;