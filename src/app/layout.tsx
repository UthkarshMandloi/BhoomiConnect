import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BhoomiConnect | Evidence-to-Policy Platform",
  description: "National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance",
};

import { AppProvider } from "@/lib/context/app-context";

export default function RootLayout({ children }: any) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
