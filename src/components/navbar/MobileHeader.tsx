"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";

interface MobileHeaderProps {
  onOpen: () => void
}

export default function MobileHeader({ onOpen }: MobileHeaderProps) {
  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
        <button
          onClick={onOpen}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Open sidebar"
        >
          <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}