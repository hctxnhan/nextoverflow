import { getUserProfile } from "@/lib/actions/user.actions";
import { QuestionCard } from "../../../components/QuestionCard";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { NO_RESULT_PROPS } from "@/constants";

export async function TopQuestionList({ userId }: { userId: string }) {
  const userInfo = (await getUserProfile(userId))!;

  const posts = userInfo.questions;

  return (
    <div className="flex flex-col gap-8">
      {posts.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}

      {posts.length === 0 && <NoResult {...NO_RESULT_PROPS.topQuestions} />}
    </div>
  );
}
