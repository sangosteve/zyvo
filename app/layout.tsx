import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"
import { ReactQueryProvider } from "@/providers/react-query-provider";
const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zyvo",
  description: "Automate your social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={font.className}>
        <ClerkProvider>
          <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
