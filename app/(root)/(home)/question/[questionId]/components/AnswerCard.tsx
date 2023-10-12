import { MarkdownRenderer } from "@/components/shared/markdown-renderer/MarkdownRenderer";
import { AnswerDetail } from "@/lib/actions/answer.actions";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";

interface AnswerCardProps {
  answer: AnswerDetail;
}

export async function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <div>
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
      <MarkdownRenderer className="prose-base" content={answer.content} />
    </div>
  );
}
