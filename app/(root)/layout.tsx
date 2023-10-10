import { LeftSidebar } from "@/components/shared/left-sidebar/LeftSidebar";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { RightSidebar } from "@/components/shared/right-sidebar/RightSidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative bg-background-lighter">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <main className="min-h-screen flex-1 bg-background-darker pt-24 max-md:pb-14 max-sm:px-4 sm:px-14">
          <div className="mx-auto w-full max-w-5xl pt-4 max-sm:pt-0">
            {children}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
