import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { SimilarityQuestionList } from "./SimilarityQuestionList";
import { Button } from "@/components/ui/button";

export function SimilarityQuestionDialog({
  similarQuestions,
  onEnsureNoDuplicate,
}: {
  similarQuestions: [string, number][];
  onEnsureNoDuplicate: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger className="block">
        <Alert variant={"destructive"}>
          <AlertTitle>
            Your question looks bit similar to other questions!
          </AlertTitle>
          <AlertDescription>
            We found some similar questions to yours. Please check carefully
            before posting. Click here to see the list.
          </AlertDescription>
        </Alert>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">
            This is a list of similar questions to yours. Please check carefully
            before posting.
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <SimilarityQuestionList similarQuestions={similarQuestions} />
            <DialogClose asChild>
              <Button className="w-full" onClick={onEnsureNoDuplicate}>
                I ensure that my question is not a duplicate of the above
                questions
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
