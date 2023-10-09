import { Badge } from "@/components/ui/badge";

export function Tag({ children }: { children: string }) {
  return (
    <Badge className="bg-background-darker font-normal uppercase text-foreground-darker shadow-none hover:bg-background-darker">
      {children}
    </Badge>
  );
}
