import type { ReactNode } from "react"

import Navbar from "@/components/Navbar"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="min-h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}