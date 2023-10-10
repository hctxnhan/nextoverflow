import { Tag } from "@/components/shared/tag/Tag";
import { QuestionInHomepage } from "@/lib/actions/question.actions";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";

interface QuestionCardProps {
  question: QuestionInHomepage;
}

export function QuestionCard({
  question: { author, tags, title, upvotes, createdAt },
}: QuestionCardProps) {
  return (
    <div className="flex flex-col rounded-md bg-background-lighter px-6 py-4 shadow-shadow transition-shadow hover:shadow-2xl">
      <h3 className="h3-bold line-clamp-1">{title}</h3>
      <div className="mt-1 flex gap-1">
        {tags.map((tag) => (
          <Tag key={tag.name}>{tag.name}</Tag>
        ))}
      </div>
      <div className="flex-between mt-4 gap-1 max-md:flex-col max-md:items-start">
        <div className="subtle-regular flex items-center gap-1 max-md:order-1">
          <Image
            src="assets/images/site-logo.svg"
            width={15}
            height={15}
            alt="avatar"
          />
          <span className="max-md:hidden">asked by</span>{" "}
          <span className="subtle-medium text-primary">{author.name}</span>{" "}
          <span>{getTimestamp(createdAt)}</span>
        </div>
        <div className="flex justify-end gap-3">
          <div className="flex-center subtle-regular gap-1">
            <ThumbsUp width={15} height={15} />
            {formatAndDivideNumber(upvotes)} upvotes
          </div>
          {/* <div className="flex-center subtle-regular gap-1">
            <EyeIcon width={15} height={15} />
            {formatAndDivideNumber(views)} views
          </div>
          <div className="flex-center subtle-regular gap-1">
            <MessageCircle width={15} height={15} />
            {formatAndDivideNumber(answers.length)} answers
          </div> */}
        </div>
      </div>
    </div>
  );
}
