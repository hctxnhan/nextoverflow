import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopQuestionList } from "./TopQuestionList";
import { TopAnswerList } from "./TopAnswerList";
import { UserProfile as IUserProfile } from "@/lib/actions/user.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";

export function UserProfile({
  userInfo,
  isCurrentUser = false,
}: {
  userInfo: IUserProfile;
  isCurrentUser?: boolean;
}) {
  return (
    <div className="space-y-14">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4 max-sm:flex-col">
          <Image
            src={userInfo.picture ?? "/assets/images/default-logo.svg"}
            width={170}
            height={170}
            className="rounded-full border-4 border-primary"
            alt={`${userInfo.name} profile picture`}
          />
          <div className="flex flex-col justify-center">
            <p className="h1-bold">{userInfo.name}</p>
            <p className="base-medium text-foreground-darker">
              @{userInfo.username}
            </p>
            <p className="mt-2 text-foreground-darker">
              &quot;{userInfo.bio}&quot;
            </p>
            <div className="mt-6 flex items-center gap-2">
              <CalendarCheck2 />
              <p className="small-regular">
                Joined{" "}
                {new Date(userInfo.joinedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </div>
        <SignedIn>
          {isCurrentUser && (
            <Link className="self-end" href={`/profile/edit`}>
              <Button>Edit Profile</Button>
            </Link>
          )}
        </SignedIn>
      </div>
      <div>
        <p className="h2-bold mb-2 mt-6">Stats</p>
        <div className="flex w-fit gap-10 rounded-md bg-background px-8 py-6 text-center">
          <div>
            <p className="text-4xl font-bold">{userInfo._count.questions}</p>
            <p className="font-medium">Questions</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{userInfo._count.answers}</p>
            <p className="font-medium">Answers</p>
          </div>
        </div>
      </div>

      <div>
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="questions">Top Questions</TabsTrigger>
            <TabsTrigger value="answers">Top Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="questions">
            <TopQuestionList userId={userInfo.clerkId} />
          </TabsContent>
          <TabsContent value="answers">
            <TopAnswerList userId={userInfo.clerkId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
