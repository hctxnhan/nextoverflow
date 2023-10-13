"use client";

import { MarkdownEditor } from "@/components/shared/markdown-editor/MarkdownEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRequiredIndicator,
} from "@/components/ui/form";
import { AnswerFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import z from "zod";
import { Button } from "@/components/ui/button";
import { createAnswer } from "@/lib/actions/answer.actions";
import { cn } from "@/lib/utils";

export function AnswerForm({
  questionId,
  className,
}: {
  questionId: number;
  className?: string;
}) {
  const { user, isSignedIn } = useUser();

  const form = useForm<z.infer<typeof AnswerFormSchema>>({
    resolver: zodResolver(AnswerFormSchema),
    defaultValues: {
      body: "",
    },
  });

  async function onSubmit(data: z.infer<typeof AnswerFormSchema>) {
    await createAnswer({
      body: data.body,
      questionId,
    });

    form.reset();
  }

  if (!isSignedIn) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">
                Comment as <span className="font-bold">{user!.fullName}</span>
                <FormRequiredIndicator />
              </FormLabel>
              <FormControl>
                <MarkdownEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Comment
        </Button>
      </form>
    </Form>
  );
}
