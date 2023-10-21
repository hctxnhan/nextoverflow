import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  username: string;
  name: string | null;
  imageUrl: string | null;
  userId: string;
}

export function UserCard({ username, name, imageUrl, userId }: UserCardProps) {
  return (
    <Link
      href={`/profile/${userId}`}
      className="flex-center shadow-on-hover flex-col rounded-xl bg-background-light p-6"
    >
      <Image
        src={imageUrl ?? "/assets/images/default-logo.svg"}
        width={100}
        height={100}
        className="rounded-full"
        alt={`${name} profile picture`}
      />
      <p className="h3-bold">{name}</p>
      <p className="body-medium line-clamp-1 inline-block w-full truncate text-center text-foreground-light">
        @{username}
      </p>
    </Link>
  );
}
