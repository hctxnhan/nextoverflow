import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface NoResultProps {
  title: string;
  description: string;
  actionHref: string;
  actionText: string;
  className?: string;
}

export function NoResult({
  title,
  description,
  actionHref,
  actionText,
  className,
}: NoResultProps) {
  return (
    <div
      className={cn("flex-center mx-auto max-w-md flex-col gap-4", className)}
    >
      <Image
        src="/assets/images/light-illustration.png"
        width={300}
        height={300}
        alt="No result"
        className="dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        width={300}
        height={300}
        alt="No result"
        className="hidden dark:flex"
      />

      <p className="h2-bold text-center">{title}</p>
      <p className="text-center">{description}</p>

      <Link href={actionHref}>
        <Button>{actionText}</Button>
      </Link>
    </div>
  );
}
