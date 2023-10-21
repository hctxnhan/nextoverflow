import { NoResult } from "@/components/shared/no-result/NoResult";
import { getUserProfile } from "@/lib/actions/user.actions";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopQuestionList } from "./components/TopQuestionList";
import { TopAnswerList } from "./components/TopAnswerList";

export default async function Page({ params }: { params: { userId: string } }) {
  const userInfo = await getUserProfile(params.userId);

  if (!userInfo)
    return (
      <NoResult
        title="User not found"
        description="The user you're looking for does not exist."
        actionText="Go back home"
        actionHref="/"
      />
    );

  return (
    <div className="space-y-14">
      <div className="flex gap-4">
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
          <div className="mt-6 flex items-center gap-2">
            <CalendarCheck2 />
            <p>
              Joined{" "}
              {new Date(userInfo.joinedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
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
            <TopQuestionList userId={params.userId} />
          </TabsContent>
          <TabsContent value="answers">
            <TopAnswerList userId={params.userId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
