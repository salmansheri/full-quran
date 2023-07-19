import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Header from "@/components/header";
import ThemeProvider from "@/provider/theme-provider";
import QueryProvider from "@/provider/query-provider";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/provider/session-provider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full quran - developed by salman sheriff",
  description: "Read Quran and Track your Progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(font.className)}>
      <body>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              {children}
            </ThemeProvider>
            <Toaster />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
