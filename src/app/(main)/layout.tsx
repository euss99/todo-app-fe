"use client"

import { usePathname } from "next/navigation"
import { type ReactNode, useMemo } from "react"

import Navbar from "@/components/Navbar"
import RouteName from "@/utils/enums/RouteName.enum"

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  const links = useMemo(() => {
    const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
    const activeClasses = "border-blue-500 dark:border-white text-gray-900 dark:text-white"
    const inactiveClasses = "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white"

    return (
      <div className="flex space-x-8">
        <a href={RouteName.HOME} className={`${baseClasses} ${pathname === RouteName.HOME ? activeClasses : inactiveClasses}`}>
          Home
        </a>
        <a href={RouteName.COUNTER} className={`${baseClasses} ${pathname === RouteName.COUNTER ? activeClasses : inactiveClasses}`}>
          Counter
        </a>
      </div>
    )
  }, [pathname])

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar>{links}</Navbar>
      <main className="flex-1">{children}</main>
    </div>
  )
}