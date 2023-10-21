import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const authUser = await currentUser();

  if(!authUser) return redirect("/auth/sign-in");

  return redirect(`/profile/${authUser.id}`);
}
