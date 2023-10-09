"use client";

import { SheetClose } from "@/components/ui/sheet";
import { SIDE_NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink() {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-4">
      {SIDE_NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.route);

        return (
          <SheetClose asChild key={item.label}>
            <Link
              href={item.route}
              className={cn("base-medium flex items-center gap-2 p-2", {
                "rounded-md bg-primary text-primary-foreground": active,
              })}
            >
              <item.Icon
                className={cn("fill-primary", {
                  "text-primary-foreground fill-primary-foreground": active,
                })}
              />
              <span>{item.label}</span>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
}
