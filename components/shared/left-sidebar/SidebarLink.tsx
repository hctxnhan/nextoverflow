"use client";

import { SIDE_NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink() {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-4">
      {SIDE_NAV_ITEMS.map((item) => {
        const active =
          (pathname.startsWith(item.route) && item.route !== "/") ||
          pathname === item.route;

        return (
          <Link
            key={item.label}
            href={item.route}
            className={cn(
              "base-medium flex items-center gap-2 p-2 text-foreground max-lg:justify-center",
              {
                "rounded-md bg-primary text-primary-foreground": active,
              },
            )}
          >
            <div className="flex-center h-[24px] w-[24px]">
              <item.Icon
                className={cn("fill-primary", {
                  "fill-primary-foreground text-primary-foreground": active,
                })}
              />
            </div>
            <span className="max-lg:hidden">{item.label}</span>
          </Link>
        );
      })}
    </section>
  );
}
