"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

import TodoModal from "@/components/todo/TodoModal"

export default function TodoHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTodo = (title: string, description: string) => {
    // TODO: Implementar la lógica para agregar la tarea
    console.log({ title, description })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Tareas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="w-5 h-5" />
          Agregar tarea
        </button>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTodo}
        mode="add"
      />
    </>
  )
}