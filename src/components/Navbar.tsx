"use client"

import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo,useState } from "react"

import MobileMenu from "@/components/MobileMenu"
import { useTheme } from "@/hooks/useTheme"
import RouteName from "@/utils/enums/RouteName.enum"

export default function Navbar() {
  const pathname = usePathname()
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

  const getLinkClasses = useMemo(() => {
    const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
    const activeClasses = "border-blue-500 dark:border-white text-gray-900 dark:text-white"
    const inactiveClasses = "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white"

    return (path: string) => `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`
  }, [pathname])

  if (!mounted) return null

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuIcon}
            </button>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link href={RouteName.HOME} className={getLinkClasses(RouteName.HOME)}>
              Home
            </Link>
            <Link href={RouteName.COUNTER} className={getLinkClasses(RouteName.COUNTER)}>
              Counter
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
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