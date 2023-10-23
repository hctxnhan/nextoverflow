import { getNotificationList } from "@/lib/actions/notification.actions";
import { PaginationSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.nextUrl).searchParams;

  const parsedParams = PaginationSchema.parse({
    page: searchParams.get("page"),
    pageSize: searchParams.get("pageSize"),
  });

  const filter = searchParams.get("filter") || "all";

  const notifications = await getNotificationList({
    page: parsedParams.page,
    limit: parsedParams.pageSize,
    filter,
  });

  return NextResponse.json({
    data: notifications,
  });
}
