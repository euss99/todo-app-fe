import type { ReactNode } from "react"

import Navbar from "@/components/Navbar"

export default function LoginLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}