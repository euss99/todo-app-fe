"use client"

import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"

import MobileMenu from "@/components/MobileMenu"
import { useTheme } from "@/hooks/useTheme"

interface NavbarProps {
  children?: ReactNode
}

export default function Navbar({ children }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { mounted, toggleTheme, isDark } = useTheme()

  const menuIcon = useMemo(() => {
    return isMenuOpen ? (
      <XMarkIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    ) : (
      <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    )
  }, [isMenuOpen])

  const themeIcon = useMemo(() => {
    return isDark() ? (
      <SunIcon className="w-6 h-6 text-yellow-500" />
    ) : (
      <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    )
  }, [isDark])

  if (!mounted) return null

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 md:hidden"
              aria-label="Toggle menu"
            >
              {menuIcon}
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            {children}
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {themeIcon}
            </button>
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  )
}