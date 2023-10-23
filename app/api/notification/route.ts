import { NotificationEvent } from "@/lib/event";
import { currentUser } from "@clerk/nextjs";
import { Notification } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const authUser = await currentUser();
  if (!authUser) {
    throw new Error("Unauthorized");
  }

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  NotificationEvent.getInstance()?.subscribeNotification(sendNotification);

  function sendNotification(notification: Notification) {
    if (notification.userId !== authUser?.id) return;

    writer.write(
      encoder.encode(`data: ${JSON.stringify(notification)}\n\n`),
    );
  }

  req.signal.addEventListener("abort", () => {
    writer.close();
    NotificationEvent.getInstance()?.unsubscribeNotification(sendNotification);
  });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
