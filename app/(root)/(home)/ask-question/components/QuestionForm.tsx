"use client";

import { MarkdownEditor } from "@/components/shared/markdown-editor/MarkdownEditor";
import { Tag } from "@/components/shared/tag/Tag";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRequiredIndicator,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createQuestion } from "@/lib/actions/question.actions";
import { QuestionFormSchema } from "@/lib/validation";
import { QuestionFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SimilarityQuestionDialog } from "./SimilarityQuestionDialog";
import { findSimilarQuestion } from "@/lib/actions/similarity.actions";

interface QuestionFormProps {
  prefill?: QuestionFormType;
  questionId?: number;
}

function getButtonLabel(editing: boolean, loading: boolean) {
  const label = {
    create: {
      default: "Post",
      loading: "Posting...",
    },
    edit: {
      default: "Save",
      loading: "Saving...",
    },
  };

  return label[editing ? "edit" : "create"][loading ? "loading" : "default"];
}

export function QuestionForm({ prefill, questionId }: QuestionFormProps) {
  const isEditing = !!questionId && !!prefill;
  const { toast } = useToast();
  const [similarQuestions, setSimilarQuestions] = useState<[string, number][]>(
    [],
  );
  const [hasChanged, setHasChanged] = useState(true);
  const [ensureNoDuplicate, setEnsureNoDuplicate] = useState(false);

  const form = useForm<QuestionFormType>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: isEditing
      ? prefill
      : {
          title: "",
          explanation: "",
          tags: [],
        },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change" && (name === "explanation" || name === "title")) {
        setHasChanged(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  async function onSubmit(data: QuestionFormType) {
    setHasChanged(false);

    if (!isEditing && !ensureNoDuplicate) {
      const similarQuestions = await findSimilarQuestion({
        title: data.title,
        content: data.explanation,
      });

      if (similarQuestions.length > 0) {
        setSimilarQuestions(similarQuestions);
        return;
      }
    }

    await createQuestion({
      body: data.explanation,
      tags: data.tags,
      title: data.title,
      questionId,
    });

    setSimilarQuestions([]);
    setEnsureNoDuplicate(false);

    toast({
      title: isEditing ? "Question updated" : "Question created",
      description: isEditing
        ? "Your question has been updated successfully"
        : "Your question has been created successfully",
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();

      const value = event.currentTarget.value.trim();

      if (value.length > 0) {
        if (form.getValues("tags").includes(value)) {
          form.setError("tags", {
            type: "manual",
            message: "Tag already exists",
          });
          return;
        }

        form.setValue("tags", [...form.getValues("tags"), value]);
        event.currentTarget.value = "";
        form.clearErrors("tags");
      } else {
        form.setError("tags", {
          type: "manual",
          message: "Tag cannot be empty",
        });
      }
    }
  }

  function handleRevomeTag(tag: string) {
    form.setValue(
      "tags",
      form.getValues("tags").filter((t: string) => t !== tag),
    );
  }

  const showAlertDialog =
    !ensureNoDuplicate &&
    similarQuestions.length > 0 &&
    !hasChanged &&
    !isEditing &&
    !form.formState.isSubmitting;

  const disablePostButton = form.formState.isSubmitting || showAlertDialog;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex-between">
                <div>
                  Question title
                  <FormRequiredIndicator />
                </div>
                {field.value && field.value.length > 0 && (
                  <div className="text-xs text-foreground-light">
                    {field.value.length} / 150
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g. How to center a div?" {...field} />
              </FormControl>
              <FormDescription>
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Detailed explanation of your problem?
                <FormRequiredIndicator />
              </FormLabel>
              <FormControl>
                <MarkdownEditor {...field} />
              </FormControl>
              <FormDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags
                <FormRequiredIndicator />
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="e.g. react, javascript, typescript"
                    onKeyDown={handleKeyDown}
                  />
                  {field.value && field.value.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {field.value.map((tag: string) => (
                        <Tag
                          className="bg-background-lighter hover:bg-background-lighter"
                          key={tag}
                        >
                          {tag}
                          <Button
                            className="ml-2 h-fit w-fit p-0.5"
                            variant={"ghost"}
                            onClick={() => handleRevomeTag(tag)}
                          >
                            <XIcon width={16} height={16} />
                          </Button>
                        </Tag>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disablePostButton} type="submit">
          {getButtonLabel(isEditing, form.formState.isSubmitting)}
        </Button>
      </form>
      {showAlertDialog && (
        <SimilarityQuestionDialog
          onEnsureNoDuplicate={() => {
            setEnsureNoDuplicate(true);
            setSimilarQuestions([]);
          }}
          similarQuestions={similarQuestions}
        />
      )}
    </Form>
  );
}
