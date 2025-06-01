"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import StatusText from "@/utils/constants/StatusText.constant";
import TodoStatus from "@/utils/enums/TodoStatus.enum";
import { formatDate } from "@/utils/helpers/date.helper";

interface TodoCardProps {
  title: string
  description: string
  date: Date
  status: TodoStatus
  onEdit?: () => void
  onDelete?: () => void
}

const STATUS_COLORS: Record<TodoStatus, string> = {
  [TodoStatus.PENDING]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  [TodoStatus.IN_PROGRESS]: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  [TodoStatus.COMPLETED]: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
};

export default function TodoCard({ title, description, date, status, onEdit, onDelete }: TodoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">{title}</h3>
            <span className={`shrink-0 px-3 py-1 rounded text-sm sm:text-base font-medium ${STATUS_COLORS[status]}`}>
              {StatusText[status]}
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 break-words">{description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Creado el {formatDate(date)}
            </div>
            <div className="flex">
              <button
                onClick={onEdit}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Editar tarea"
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                aria-label="Eliminar tarea"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}