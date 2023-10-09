import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SidebarLink } from "./SidebarLink";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon"} className="sm:hidden">
          <Menu width={20} height={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full border-none">
        <div className="mx-auto flex h-full max-w-[500px] flex-col gap-4">
          <Link href="/" className="flex-center gap-2">
            <Image
              src={"/assets/images/site-logo.svg"}
              width={24}
              height={24}
              alt="Site logo"
            />
            <p className="h2-bold flex-center text-primary">
              Next
              <span className="text-foreground">Overflow</span>
            </p>
          </Link>

          <SidebarLink />

          <SignedOut>
            <div className="mt-auto flex flex-col gap-2">
              <SheetClose asChild>
                <Link className="w-full" href="/sign-in">
                  <Button className="w-full" size="lg" variant="secondary">
                    Sign in
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="w-full" href="/sign-up">
                  <Button className="w-full" size="lg">
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
