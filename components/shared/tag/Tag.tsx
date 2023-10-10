import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        "bg-background-darker font-normal uppercase text-foreground-darker shadow-none hover:bg-background-darker",
        className,
      )}
    >
      {children}
    </Badge>
  );
}
