import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "NextOverflow",
  description: "A place to ask questions and get answers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: "primary-gradient",
            footerActionLink: "primary-text-gradient hover:text-primary-500",
            headerTitle: "text-primary-500 h2-bold",
            card: "shadow-2xl shadow-slate-200 rounded-xl",
          },
        }}
      >
        <html lang="en">
          <body className={inter.variable + " " + spaceGrotesk.variable}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
