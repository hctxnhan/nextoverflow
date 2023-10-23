import { MarkdownRenderer } from "@/components/shared/markdown-renderer/MarkdownRenderer";
import {
  Activate,
  ActivateContent,
  ActivateTrigger,
} from "@/components/ui/activate";
import { Button } from "@/components/ui/button";
import { AnswerDetail } from "@/lib/actions/answer.actions";
import { cn, getTimestamp } from "@/lib/utils";
import { SignedIn, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { DeleteAnswerButton } from "./DeleteAnswerButton";
import { ReplyAnswer } from "./ReplyAnswer";
import { ReplyBox } from "./ReplyBox";
import { VoteForAnswer } from "./VoteForAnswer";

interface AnswerCardProps {
  answer: AnswerDetail;
}

export async function AnswerCard({ answer }: AnswerCardProps) {
  const authUser = await currentUser();

  return (
    <Activate>
      <div className={cn("rounded-md border border-background-darker p-4")}>
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
          <VoteForAnswer answer={answer} />
          <div className="flex flex-1 flex-col">
            <div className="flex-1 rounded-md bg-background-darker p-3">
              <MarkdownRenderer
                className="prose-base max-w-none"
                content={answer.content}
              />
            </div>
            <div className="mt-2 flex justify-end gap-4">
              <SignedIn>
                {authUser?.id === answer.author.clerkId && (
                  <DeleteAnswerButton
                    answerId={answer.id}
                    content={answer.content}
                  />
                )}
              </SignedIn>

              <ActivateTrigger>
                {answer._count && answer._count.replies > 0 && (
                  <Button variant="link">
                    {answer._count.replies} replies
                  </Button>
                )}
              </ActivateTrigger>

              <SignedIn>
                <ReplyBox parentAnswer={answer} />
              </SignedIn>
            </div>
            <ActivateContent>
              <ReplyAnswer
                totalReply={answer._count?.replies ?? 0}
                answerId={answer.id}
              />
            </ActivateContent>
          </div>
        </div>
      </div>
    </Activate>
  );
}
