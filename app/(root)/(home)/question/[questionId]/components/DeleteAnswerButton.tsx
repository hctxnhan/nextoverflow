"use client";

import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/form-button";
import { useToast } from "@/components/ui/use-toast";
import { deleteAnswer } from "@/lib/actions/answer.actions";
import { shortenContent } from "@/lib/utils";
import { FormEvent } from "react";

export function DeleteAnswerButton({
  answerId,
  content,
}: {
  answerId: number;
  content: string;
}) {
  const { toast } = useToast();

  async function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    await deleteAnswer(answerId);

    toast({
      title: "Your answer has been deleted",
      description: shortenContent(content),
    });
  }

  return (
    <form onSubmit={handleDelete}>
      <FormButton>
        <Button variant="link" className="text-destructive">
          Delete
        </Button>
      </FormButton>
    </form>
  );
}
