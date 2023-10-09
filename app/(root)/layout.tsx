import { LeftSidebar } from "@/components/shared/left-sidebar/LeftSidebar";
import { Navbar } from "@/components/shared/navbar/Navbar";
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

        <main className="min-h-screen">
          Main content
          {children}
        </main>

        <div>Right sidebar</div>
      </div>
    </div>
  );
}
