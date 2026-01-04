import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/theme-button";
import Link from "next/link";
import { SessionProvider, signOut } from "next-auth/react";
import SessionUpdation from "@/components/SessionUpdation";
import { Toaster } from "@/components/ui/sonner";
import LogoutButton from "@/components/LogoutButton";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow AI",
  description: "TaskFlow AI is a application which keeps record of tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          <SessionProvider>
        <div className="flex flex-col min-h-screen justify-center">

        <div className="md:sticky md:top-0 bg-[var(--background)]! z-40 flex justify-between px-5 py-3 items-center border-b ">
        <Link href='/'>
        <div className="text-2xl font-bold">TaskFlow AI</div>
        </Link>
        <div className="flex gap-5 items-center">
          <ModeToggle />
        <LogoutButton/>
        </div>
      </div>
      <Toaster/>
        {children}
        <div className="bg-[var(--background)] w-full border-t p-4 text-xl font-semibold text-center">&copy; Copyright By TaskFlow AI</div>
        </div>
      <SessionUpdation/>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
