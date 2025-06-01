"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

import { useTodo } from "@/hooks/useTodo";
import { useModalStore } from "@/store/modalStore";

export default function TodoHeader() {
  const { openModal } = useModalStore();
  const { todos } = useTodo();

  const totalTasks = useMemo(() => todos.length, [todos]);

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Tasks{totalTasks > 0 ? ` (${totalTasks})` : ""}
      </h1>
      <button
        onClick={openModal}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="w-5 h-5" />
        Add Task
      </button>
    </div>
  );
}