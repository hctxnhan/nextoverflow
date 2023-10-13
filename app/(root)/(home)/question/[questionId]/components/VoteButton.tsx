import { Button, ButtonProps } from "@/components/ui/button";
import { FormButton } from "@/components/ui/form-button";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { VoteType } from "@prisma/client";

interface VoteButtonProps extends ButtonProps {
  userVote?: VoteType;
  voteType: VoteType;
}

export async function VoteButton({
  children,
  userVote,
  voteType,
  className,
  ...rest
}: VoteButtonProps) {
  const user = await currentUser();

  return (
    <FormButton>
      <Button
        disabled={!user}
        type="submit"
        className={cn(
          "h-fit bg-transparent p-0 text-input hover:bg-transparent hover:text-primary",
          {
            "bg-primary text-white hover:bg-primary/80 hover:text-white":
              userVote === voteType,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Button>
    </FormButton>
  );
}
