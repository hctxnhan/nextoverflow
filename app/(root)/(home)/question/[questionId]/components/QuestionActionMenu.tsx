import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getQuestionById,
  isQuestionBelongToCurrentUser,
} from "@/lib/actions/question.actions";
import { MoreVertical } from "lucide-react";
import { DeleteQuestionButton } from "../edit/components/DeleteQuestionButton";
import { EditQuestionButton } from "../edit/components/EditQuestionButton";
import { SavedQuestionButton } from "./SavedQuestionButton";

interface QuestionActionMenuProps {
  questionId: number;
}

export async function QuestionActionMenu({
  questionId,
}: QuestionActionMenuProps) {
  const question = await getQuestionById(questionId);
  if (!question) return null;

  const isOwner = await isQuestionBelongToCurrentUser(questionId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-2 py-2">
          <SavedQuestionButton
            hasSaved={question._count.savedBy > 0}
            questionId={questionId}
          />
          {isOwner && (
            <>
              <EditQuestionButton questionId={questionId} />
              <DeleteQuestionButton questionId={questionId} />
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
