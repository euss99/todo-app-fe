"use client"

import type { ReactNode } from "react"

import AuthHeader from "@/components/navbar/AuthHeader"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AuthHeader />
      <main className="flex-1">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}