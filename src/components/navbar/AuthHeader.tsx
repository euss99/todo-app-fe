"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"

import { useTheme } from "@/hooks/useTheme"

export default function AuthHeader() {
  const { mounted, toggleTheme, isDark } = useTheme()

  const themeIcon = useMemo(() => {
    return isDark() ? (
      <SunIcon className="w-6 h-6 text-yellow-500" />
    ) : (
      <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    )
  }, [isDark])

  if (!mounted) return null

  return (
    <nav className="flex items-center justify-between container h-16 px-4 mx-auto dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Toggle dark mode"
      >
        {themeIcon}
      </button>
    </nav>
  )
}