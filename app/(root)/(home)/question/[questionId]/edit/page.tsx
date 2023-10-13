import { getQuestionById } from "@/lib/actions/question.actions";
import { NoQuestionFound } from "../components/NoQuestionFound";
import { QuestionForm } from "../../../ask-question/components/QuestionForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: { questionId: string };
}) {
  const questionId = params.questionId;
  const questionIdNumber = parseInt(questionId);
  if (isNaN(questionIdNumber)) return <NoQuestionFound />;

  const question = await getQuestionById(questionIdNumber);
  if (!question) return <NoQuestionFound />;

  return (
    <div>
      <h1 className="h1-bold">Edit question</h1>
      <Link href={`/question/${questionId}`}>
        <Button className="flex gap-1" variant="link">
          <Undo2Icon size={20} />
          Back to question
        </Button>
      </Link>

      <QuestionForm
        prefill={{
          explanation: question.content,
          tags: question.tags.map((tag) => tag.name),
          title: question.title,
        }}
        questionId={questionIdNumber}
      />
    </div>
  );
}
