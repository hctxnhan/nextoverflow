import Image from "next/image";

interface UserCardProps {
  username: string;
  name: string | null;
  imageUrl: string | null;
}

export function UserCard({ username, name, imageUrl }: UserCardProps) {
  return (
    <div className="flex-center shadow-on-hover flex-col rounded-xl bg-background-light p-6">
      <Image
        src={imageUrl ?? "/assets/images/default-logo.svg"}
        width={100}
        height={100}
        className="rounded-full"
        alt={`${name} profile picture`}
      />
      <p className="h3-bold mt-2">{name}</p>
      <p className="body-medium text-foreground-light">@{username}</p>
    </div>
  );
}
