"use client";

import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/form-button";
import { useToast } from "@/components/ui/use-toast";
import { deleteQuestion } from "@/lib/actions/question.actions";
import { FileX } from "lucide-react";

interface DeleteQuestionButtonProps {
  questionId: number;
}

export function DeleteQuestionButton({
  questionId,
}: DeleteQuestionButtonProps) {
  const { toast } = useToast();

  async function handleDeleteQuestion() {
    try {
      await deleteQuestion(questionId);
      toast({
        title: "Question deleted",
        description: "Your question has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your question could not be deleted.",
        variant: "destructive",
      });
    }
  }

  return (
    <form action={handleDeleteQuestion}>
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
