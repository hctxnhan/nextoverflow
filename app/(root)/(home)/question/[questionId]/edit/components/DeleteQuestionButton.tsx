import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/form-button";
import {
  deleteQuestion,
  isQuestionBelongToCurrentUser,
} from "@/lib/actions/question.actions";
import { FileX } from "lucide-react";

interface DeleteQuestionButtonProps {
  questionId: number;
}

export async function DeleteQuestionButton({
  questionId,
}: DeleteQuestionButtonProps) {
  const isOwner = await isQuestionBelongToCurrentUser(questionId);
  if (!isOwner) return null;

  return (
    <form action={deleteQuestion.bind(null, questionId)}>
      <FormButton>
        <Button
          variant={"customIcon"}
          className="flex-center w-full hover:text-red-500"
        >
          Delete <FileX size={20} />
        </Button>
      </FormButton>
    </form>
  );
}
