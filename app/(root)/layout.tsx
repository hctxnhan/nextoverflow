import { Navbar } from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative">
      <Navbar />
      <div>
        <div>Left sidebar</div>

        <main className="min-h-screen">
          Main content
          {children}
        </main>

        <div>Right sidebar</div>
      </div>
      Toaster
    </div>
  );
}
