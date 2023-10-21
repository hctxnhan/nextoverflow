import { Button } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { EditProfileForm } from "./components/EditProfileForm";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const authUser = await currentUser();
  if (!authUser) return redirect("/auth/sign-in");

  const userInfo = await getUserById({ clerkId: authUser.id });
  if(!userInfo) return redirect("/");
  
  return (
    <div>
      <h1 className="h1-bold">Edit question</h1>
      <Link href={`/profile`}>
        <Button className="flex gap-1" variant="link">
          <Undo2Icon size={20} />
          Back to profile
        </Button>
      </Link>

      <EditProfileForm userInfo={userInfo} />
    </div>
  );
}
