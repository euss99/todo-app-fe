"use client";

import { ArrowRightStartOnRectangleIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/authStore";
import RouteName from "@/utils/enums/RouteName.enum";

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { mounted, toggleTheme, isDark } = useTheme();
  const { user } = useAuthStore();

  const getLinkClasses = (path: string) => {
    const baseClasses = "flex items-center px-4 py-2 text-base font-medium rounded-md transition-colors duration-200";
    const activeClasses = "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white";
    const inactiveClasses = "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white";

    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  };

  const transformClasses = useMemo(() => isOpen ? "translate-x-0" : "-translate-x-full", [isOpen]);
  const themeIcon = useMemo(() => {
    return isDark() ? (
      <SunIcon className="w-6 h-6 text-yellow-500" />
    ) : (
      <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    );
  }, [isDark]);

  const handleLogout = async () => {
    router.push(RouteName.LOGIN);
  };

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${transformClasses}`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link href={RouteName.HOME} className={getLinkClasses(RouteName.HOME)}>
              Home
            </Link>
          </nav>

          <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-base font-medium text-gray-900 dark:text-white">
              Hola, {user?.name || "Usuario"}
            </p>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {themeIcon}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
              aria-label="Cerrar sesión"
            >
              <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}