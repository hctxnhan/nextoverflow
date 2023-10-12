import { MarkdownRenderer } from "@/components/shared/markdown-renderer/MarkdownRenderer";
import { Tag } from "@/components/shared/tag/Tag";
import { QuestionInDetail } from "@/lib/actions/question.actions";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { EyeIcon, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface QuestionDetailProps {
  question: QuestionInDetail;
}

export function QuestionDetail({ question }: QuestionDetailProps) {
  return (
    <div className="flex flex-col">
      <div className="body-regular mb-2 flex items-center text-foreground-dark">
        <Image
          src={question.author.picture ?? "/assets/images/default-logo.svg"}
          width={24}
          height={24}
          alt="avatar"
          className="mr-2 rounded-full"
        />
        <p>
          <span className="body-medium">{question.author.name}</span>
          <span> asked {getTimestamp(question.createdAt)}</span>
        </p>
      </div>

      <div className="flex items-center gap-2"></div>
      <h1 className="h1-bold text-black dark:text-white">{question.title}</h1>
      <div className="mt-2 flex gap-2">
        {question.tags.length > 0 &&
          question.tags.map((tag) => (
            <Tag
              className="paragraph-regular bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
              key={tag.name}
            >
              {tag.name}
            </Tag>
          ))}
      </div>

      <MarkdownRenderer content={question.content} className="mt-10" />

      <div className="mt-6 flex gap-10 text-foreground-light">
        <div className="flex-center gap-2">
          <ThumbsUp width={15} height={15} />
          {formatAndDivideNumber(question.upvotes)} upvotes
        </div>
        <div className="flex-center gap-2">
          <EyeIcon width={15} height={15} />
          {formatAndDivideNumber(12)} views
        </div>
        <div className="flex-center gap-2">
          <MessageCircle width={15} height={15} />
          {formatAndDivideNumber(12)} answers
        </div>
      </div>
    </div>
  );
}
