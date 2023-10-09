import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { SidebarLink } from "./SidebarLink";
import SignInSvg from "@/public/assets/icons/account.svg";
import SignUpSvg from "@/public/assets/icons/sign-up.svg";

export function LeftSidebar() {
  return (
    <div className="sticky left-0 top-0 flex h-screen flex-col p-4 pt-24 max-sm:hidden lg:w-[250px]">
      <SidebarLink />

      <SignedOut>
        <div className="mt-auto flex flex-col gap-2">
          <Link className="w-full" href="/sign-in">
            <Button
              className="flex-center w-full gap-2  max-lg:p-2"
              size="lg"
              variant="secondary"
            >
              <SignInSvg className="fill-secondary-foreground" />
              <span className="max-lg:hidden">Sign in</span>
            </Button>
          </Link>
          <Link className="w-full" href="/sign-up">
            <Button className="flex-center w-full gap-2 max-lg:p-2" size="lg">
              <SignUpSvg className="fill-secondary" />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
