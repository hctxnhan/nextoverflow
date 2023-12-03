import { PaginationSchema } from "@/lib/validation";
import { AnswerList } from "../../components/AnswerList";

export default function Page({
  params: { questionId },
  searchParams,
}: {
  params: { questionId: string };
  searchParams: URLSearchParams;
}) {
  const questionIdNumber = parseInt(questionId);

  const { page } = PaginationSchema.parse(searchParams);
  
  return (
    <div className="rounded-md bg-background p-8 max-sm:p-4">
      <AnswerList
        questionId={questionIdNumber}
        page={page}
      />
    </div>
  );
}
