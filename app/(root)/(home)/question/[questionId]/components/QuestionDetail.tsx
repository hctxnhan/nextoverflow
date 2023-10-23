import { MarkdownRenderer } from "@/components/shared/markdown-renderer/MarkdownRenderer";
import { Tag } from "@/components/shared/tag/Tag";
import { getQuestionById } from "@/lib/actions/question.actions";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { EyeIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import { QuestionActionMenu } from "./QuestionActionMenu";
import { VoteForQuestion } from "./VoteForQuestion";

export async function QuestionDetail({ questionId }: { questionId: number }) {
  const question = await getQuestionById(questionId);

  if (!question) return null;

  return (
    <div className="relative flex flex-col">
      <div className="flex-between">
        <div className="body-regular mb-2 flex items-center text-foreground-light">
          <Image
            src={question.author?.picture ?? "/assets/images/default-logo.svg"}
            width={24}
            height={24}
            alt="avatar"
            className="mr-2 rounded-full"
          />
          <p>
            <span className="body-medium">{question.author?.name}</span>
            <span> asked {getTimestamp(question.createdAt)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <QuestionActionMenu questionId={questionId} />
        </div>
      </div>

      <div className="flex gap-2">
        <VoteForQuestion questionId={questionId} />
        <div>
          <h1 className="h1-bold text-black dark:text-white">
            {question.title}
          </h1>
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
        </div>
      </div>
      <MarkdownRenderer content={question.content} className="mt-10" />

      <div className="body-regular mt-6 flex gap-10 text-foreground-light">
        <div className="flex-center gap-2">
          <EyeIcon width={15} height={15} />
          {formatAndDivideNumber(question.views)} views
        </div>
        <div className="flex-center gap-2">
          <MessageCircle width={15} height={15} />
          {formatAndDivideNumber(question._count.answers)} answers
        </div>
      </div>
    </div>
  );
}
