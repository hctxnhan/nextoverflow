import { Tag } from "@/components/shared/tag/Tag";
import { QuestionInHomepage } from "@/lib/actions/question.actions";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { ArrowBigUp, EyeIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface QuestionCardProps {
  question: QuestionInHomepage;
}

export function QuestionCard({
  question: { id, author, tags, title, createdAt, _count, views },
}: QuestionCardProps) {
  return (
    <Link href={`/question/${id}`}>
      <div className="flex flex-col rounded-md bg-background px-6 py-4 shadow-shadow transition-shadow hover:shadow-2xl">
        <h3 className="h3-bold line-clamp-1">{title}</h3>
        <div className="mt-2 flex gap-2">
          {tags.map((tag) => (
            <Tag key={tag.name}>{tag.name}</Tag>
          ))}
        </div>
        <div className="flex-between mt-6 gap-1 text-foreground-dark max-md:flex-col max-md:items-start">
          <div className="small-regular flex items-center gap-1  max-md:order-1">
            <Image
              src={author?.picture ?? "/assets/images/default-logo.svg"}
              width={20}
              height={20}
              alt="avatar"
              className="rounded-full"
            />
            <span className="max-md:hidden">asked by</span>{" "}
            <span className="small-medium text-primary">{author?.name}</span>{" "}
            <span>{getTimestamp(createdAt)}</span>
          </div>
          <div className="flex justify-end gap-3">
            <div className="flex-center small-regular gap-1">
              <EyeIcon width={15} height={15} />
              {formatAndDivideNumber(views)} views
            </div>
            <div className="flex-center small-regular gap-1">
              <ArrowBigUp width={18} height={18} />
              {formatAndDivideNumber(_count.votes)} upvotes
            </div>
            <div className="flex-center small-regular gap-1">
              <MessageCircle width={15} height={15} />
              {formatAndDivideNumber(_count.answers)} answers
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
