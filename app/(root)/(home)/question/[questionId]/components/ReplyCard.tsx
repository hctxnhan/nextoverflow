import { MarkdownRenderer } from "@/components/shared/markdown-renderer/MarkdownRenderer";
import { AnswerDetail } from "@/lib/actions/answer.actions";
import { cn, getTimestamp } from "@/lib/utils";
import Image from "next/image";

interface AnswerCardProps {
  answer: AnswerDetail;
}

export function ReplyCard({ answer }: AnswerCardProps) {
  return (
    <div className={cn("ml-8 rounded-md border border-background-darker p-4")}>
      <div className="body-regular mb-4 flex items-center">
        <Image
          src={answer.author.picture ?? "/assets/images/default-logo.svg"}
          width={30}
          height={30}
          alt="avatar"
          className="mr-2 rounded-full"
        />
        <p>
          <span className="body-medium">{answer.author.name}</span>
          <span className="text-foreground-dark">
            {" "}
            {getTimestamp(answer.createdAt)}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 rounded-md bg-background-darker p-3">
          <MarkdownRenderer
            className="prose-base max-w-none"
            content={answer.content}
          />
        </div>
      </div>
    </div>
  );
}
