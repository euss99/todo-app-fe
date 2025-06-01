"use client";

import StatusText from "@/utils/constants/StatusText.constant";
import TodoStatus from "@/utils/enums/TodoStatus.enum";

interface TodoSelectProps {
  id: string;
  label: string;
  value: TodoStatus;
  onChange: (value: TodoStatus) => void;
  required?: boolean;
}

export default function TodoSelect({ id, label, value, onChange, required = false }: TodoSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as TodoStatus)}
        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        required={required}
      >
        {Object.entries(StatusText).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}