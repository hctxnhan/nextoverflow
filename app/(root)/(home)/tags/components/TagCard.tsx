import { Tag } from "@/components/shared/tag/Tag";
import { TagInTagsPage } from "@/lib/actions/tag.actions";
import Link from "next/link";

interface TagCardProps {
  tag: TagInTagsPage;
}

export function TagCard({ tag }: TagCardProps) {
  return (
    <Link href={`/tags/${tag.name}`}>
      <div
        className="flex flex-col gap-3 rounded-md 
      bg-background-light p-4 shadow-shadow hover:shadow-xl"
      >
        <Tag className="px-3 py-2">
          <span className="base-medium w-full text-center text-foreground-lighter">
            {tag.name}
          </span>
        </Tag>
        <p className="small-regular line-clamp-3 text-foreground-light">
          {tag.description}
        </p>
        <p className="flex-start small-regular mt-1 items-baseline gap-1 text-foreground-lighter">
          <span className="h3-bold text-accent">{tag._count.questions}+</span>
          questions asked
        </p>
      </div>
    </Link>
  );
}
