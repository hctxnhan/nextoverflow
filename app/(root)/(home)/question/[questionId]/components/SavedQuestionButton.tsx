"use client";

import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/form-button";
import { useToast } from "@/components/ui/use-toast";
import { handleSaveQuestion } from "@/lib/actions/question.actions";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Link from "next/link";

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
  const { toast } = useToast();

  async function onSubmit() {
    await handleSaveQuestion(questionId);
    if (!hasSaved) {
      toast({
        title: "Saved",
        description: "Your question has been saved into your collection.",
        action: (
          <Link href="/collection">
            <Button className="border-white" variant={"outline"}>
              View
            </Button>
          </Link>
        ),
      });
    } else {
      toast({
        title: "Unsaved",
        description: "Your question has been removed from your collection.",
      });
    }
  }

  return (
    <form className={className} action={onSubmit}>
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
