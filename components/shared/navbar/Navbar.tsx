import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MobileNav } from "./MobileNav";
import { GlobalSearch } from "./GlobalSearch";

export function Navbar() {
  return (
    <nav className="flex-between fixed z-50 w-full p-6">
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

      <GlobalSearch />
      
      <div className="flex-center gap-2">
        <ThemeSwitcher />
        <SignedIn>
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
      </div>
      <MobileNav />
    </nav>
  );
}
