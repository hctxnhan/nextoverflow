import { getUserProfile } from "@/lib/actions/user.actions";
import { QuestionCard } from "../../../components/QuestionCard";

export async function TopQuestionList({ userId }: { userId: string }) {
  const userInfo = (await getUserProfile(userId))!;

  const posts = userInfo.questions;

  return (
    <div className="flex flex-col gap-8">
      {posts.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
