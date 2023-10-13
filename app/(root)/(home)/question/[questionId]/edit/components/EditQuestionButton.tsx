import { Button } from "@/components/ui/button";
import { isQuestionBelongToCurrentUser } from "@/lib/actions/question.actions";
import { FileEdit } from "lucide-react";
import Link from "next/link";

interface EditQuestionButtonProps {
  questionId: number;
}

export async function EditQuestionButton({
  questionId,
}: EditQuestionButtonProps) {
  const isOwner = await isQuestionBelongToCurrentUser(questionId);

  return isOwner ? (
    <Link href={`/question/${questionId}/edit`}>
      <Button
        variant={"customIcon"}
        className="flex-center w-full hover:text-yellow-600"
      >
        Edit <FileEdit size={20} />
      </Button>
    </Link>
  ) : null;
}
