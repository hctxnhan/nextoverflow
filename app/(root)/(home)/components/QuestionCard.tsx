import { Tag } from "@/components/shared/tag/Tag";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { EyeIcon, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

export function QuestionCard({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col rounded-md bg-background-lighter px-6 py-4 shadow-shadow transition-shadow hover:shadow-2xl">
      <h3 className="h3-bold line-clamp-1">{title}</h3>
      <div className="mt-1 flex gap-1">
        {tags.map((tag) => (
          <Tag key={tag._id}>{tag.name}</Tag>
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
          <div className="flex-center subtle-regular gap-1">
            <EyeIcon width={15} height={15} />
            {formatAndDivideNumber(views)} views
          </div>
          <div className="flex-center subtle-regular gap-1">
            <MessageCircle width={15} height={15} />
            {formatAndDivideNumber(answers.length)} answers
          </div>
        </div>
      </div>
    </div>
  );
}
