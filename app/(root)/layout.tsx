import { LeftSidebar } from "@/components/shared/left-sidebar/LeftSidebar";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { RightSidebar } from "@/components/shared/right-sidebar/RightSidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative bg-background">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <main className="max-sm:pt-navBar min-h-screen flex-1 bg-background-darker pb-10 pt-24 max-sm:p-0 sm:px-14">
          <div className="mx-auto w-full max-w-5xl pt-4 max-sm:pt-0">
            {children}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
