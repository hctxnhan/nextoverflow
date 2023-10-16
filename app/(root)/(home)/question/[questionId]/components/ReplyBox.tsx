"use client";

import { MarkdownEditor } from "@/components/shared/markdown-editor/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AnswerDetail, replyToAnswer } from "@/lib/actions/answer.actions";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface ReplyBoxProps {
  parentAnswer: AnswerDetail;
}

export function ReplyBox({ parentAnswer }: ReplyBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm();

  async function onSubmit(data: any) {
    await replyToAnswer({
      parentAnswerId: parentAnswer.id,
      content: data.content,
    });

    form.reset();

    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isOpen && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-background-darker/70"></div>
      )}
      <DialogTrigger asChild>
        <Button variant="link">Add a reply</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[500px] max-w-3xl max-sm:h-screen max-sm:w-screen">
        <DialogHeader>
          <DialogTitle>Reply to {parentAnswer.author.name} answers</DialogTitle>
          <DialogDescription className="rounded-md bg-background-darker p-3 text-foreground-light">
            &quot;{parentAnswer.content.slice(0, 200).trim()}...&quot;
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MarkdownEditor className="max-w-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">
              Reply
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
