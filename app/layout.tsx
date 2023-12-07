import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Rubik, Bebas_Neue } from "next/font/google";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import { clerkStyleConfig } from "@/lib/clerkStyleConfig";
import { Toaster } from "@/components/ui/toaster";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ProgressBarProvider } from "@/context/ProgressBarProvider";

const body = Rubik({ subsets: ["latin"], variable: "--font-body" });

const heading = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

export const metadata: Metadata = {
  title: "NextOverflow",
  description: "A place to ask questions and get answers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn(body.variable, heading.variable, "font-body")}
      lang="en"
      suppressHydrationWarning
    >
      <ClerkProvider appearance={clerkStyleConfig}>
        <body className={cn("text-foreground")}>
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressBarProvider>{children}</ProgressBarProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
