import { LeftSidebar } from "@/components/shared/left-sidebar/LeftSidebar";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { RightSidebar } from "@/components/shared/right-sidebar/RightSidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <main className="min-h-screen flex-1">
          Main content
          {children}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
