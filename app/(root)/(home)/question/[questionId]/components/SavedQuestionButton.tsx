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
        <button
          className={cn(
            "h-fit bg-transparent p-0 text-input hover:bg-transparent hover:text-primary/80",
            {
              "text-primary hover:text-primary/80": hasSaved,
            },
          )}
        >
          <StarIcon size={24} />
        </button>
      </FormButton>
    </form>
  );
}
