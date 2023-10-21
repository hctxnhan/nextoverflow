import { MarkdownRenderer } from "@/components/shared/markdown-renderer/MarkdownRenderer";
import { Tag } from "@/components/shared/tag/Tag";
import { getUserProfile } from "@/lib/actions/user.actions";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { ArrowBigUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function TopAnswerList({ userId }: { userId: string }) {
  const userInfo = (await getUserProfile(userId))!;

  const answers = userInfo.answers;

  return (
    <div className="flex flex-col gap-8">
      {answers.map((answer) => (
        <Link key={answer.id} href={`/question/${answer.question.id}`}>
          <div className="flex flex-col rounded-md bg-background px-6 py-4 shadow-shadow transition-shadow hover:shadow-2xl">
            <h3 className="h3-bold line-clamp-1">{answer.question.title}</h3>
            <div className="mt-2 flex gap-2">
              {answer.question.tags.map((tag) => (
                <Tag key={tag.name}>{tag.name}</Tag>
              ))}
            </div>
            <MarkdownRenderer
              content={answer.content}
              className="mt-6 line-clamp-3"
            />
            <div className="flex-between mt-6 gap-1 text-foreground-dark max-md:flex-col max-md:items-start">
              <div className="small-regular flex items-center gap-1  max-md:order-1">
                <Image
                  src={
                    answer.question.author?.picture ??
                    "/assets/images/default-logo.svg"
                  }
                  width={20}
                  height={20}
                  alt="avatar"
                  className="rounded-full"
                />
                <span className="max-md:hidden">asked by</span>{" "}
                <span className="small-medium text-primary">
                  {answer.question.author?.name}
                </span>{" "}
                <span>{getTimestamp(answer.question.createdAt)}</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-center small-regular gap-1">
                  <ArrowBigUp width={18} height={18} />
                  {formatAndDivideNumber(answer._count.votes)} upvotes
                </div>
                <div className="flex-center small-regular gap-1">
                  <MessageCircle width={15} height={15} />
                  {formatAndDivideNumber(answer._count.replies)} replies
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
