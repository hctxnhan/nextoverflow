import { NoResult } from "@/components/shared/no-result/NoResult";
import { getUserProfile } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserProfile } from "./[userId]/components/UserProfile";

export default async function Page() {
  const authUser = await currentUser();

  if (!authUser) return redirect("/auth/sign-in");

  const userInfo = await getUserProfile(authUser.id);

  if (!userInfo)
    return (
      <NoResult
        title="Your profile not found. Maybe this is a bug?"
        description="The weird thing is that you're logged in but your profile is not found. Please contact us if this problem persists."
        actionText="Go back home"
        actionHref="/"
      />
    );

  return <UserProfile isCurrentUser userInfo={userInfo} />;
}
