import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/form-button";
import { handleSaveQuestion } from "@/lib/actions/question.actions";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface SavedQuestionButtonProps {
  questionId: number;
  hasSaved: boolean;
  className?: string;
}

export function SavedQuestionButton({
  questionId,
  hasSaved,
  className,
}: SavedQuestionButtonProps) {
  return (
    <form
      className={className}
      action={handleSaveQuestion.bind(null, questionId)}
    >
      <FormButton>
        <Button
          variant={"customIcon"}
          className={cn("flex-center w-full", {
            "text-primary hover:text-primary/80": hasSaved,
          })}
        >
          {hasSaved ? "Saved" : "Save"} <StarIcon size={24} />
        </Button>
      </FormButton>
    </form>
  );
}
