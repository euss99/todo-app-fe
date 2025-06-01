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

const toastStyles = "!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white !rounded-lg !shadow-lg [&.Toastify__toast--success]:!bg-green-500 [&.Toastify__toast--success]:dark:!bg-green-600 [&.Toastify__toast--error]:!bg-red-500 [&.Toastify__toast--error]:dark:!bg-red-600 [&.Toastify__toast--info]:!bg-blue-500 [&.Toastify__toast--info]:dark:!bg-blue-600 [&.Toastify__toast--warning]:!bg-yellow-500 [&.Toastify__toast--warning]:dark:!bg-yellow-600";

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <Guard>{children}</Guard>
          <ToastContainer
            toastClassName={toastStyles}
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />
        </AuthProvider>
      </body>
    </html>
  );
}
