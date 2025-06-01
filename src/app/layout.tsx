import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { defaultMetadata } from "@/app/metadata";
import Guard from "@/components/guard/Guard";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <Guard>{children}</Guard>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
