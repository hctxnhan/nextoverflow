import { NotificationList } from "@/app/(root)/notification/components/NotificationList";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { GlobalSearch } from "./GlobalSearch";
import { MobileNav } from "./MobileNav";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Navbar() {
  return (
    <nav className="flex-between fixed z-50 h-navBar w-full bg-background p-4">
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

      <GlobalSearch className="max-lg:hidden" />

      <div className="flex-center gap-2">
        <ThemeSwitcher />
        <SignedIn>
          <NotificationList />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                },
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
}
