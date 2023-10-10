import { Button } from "@/components/ui/button";
import { HomeFilter } from "./components/HomeFilter";
import { PlusIcon } from "lucide-react";
import { QuestionCard } from "./components/QuestionCard";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { NO_RESULT_PROPS } from "@/constants";
import Link from "next/link";
import { getQuestions } from "@/lib/actions/question.actions";

export default async function Home() {
  const questions = await getQuestions({
    page: 1,
    limit: 10,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex-between">
        <h1 className="h1-bold max-sm:h2-bold">All questions</h1>
        <Link href="/ask-question">
          <Button className="pr-2">
            Ask a Question
            <PlusIcon className="ml-2" width={20} height={20} />
          </Button>
        </Link>
      </div>
      <HomeFilter />

      {questions.length > 0 ? (
        <div className="flex flex-col gap-4">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <NoResult className="mt-8" {...NO_RESULT_PROPS.home} />
      )}
    </div>
  );
}
