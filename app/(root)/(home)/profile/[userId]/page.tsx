import { NoResult } from "@/components/shared/no-result/NoResult";
import { getUserProfile } from "@/lib/actions/user.actions";
import { UserProfile } from "./components/UserProfile";

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

  return <UserProfile userInfo={userInfo} />;
}
