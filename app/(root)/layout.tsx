import { LeftSidebar } from "@/components/shared/left-sidebar/LeftSidebar";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { RightSidebar } from "@/components/shared/right-sidebar/RightSidebar";
import { ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative bg-background">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <main className="min-h-screen flex-1 bg-background-darker pt-navBar">
          <div className="mx-auto w-full max-w-5xl px-4 py-3 md:p-12">
            {children}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
