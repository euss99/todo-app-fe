"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import TodoInput from "@/components/todo/TodoInput";

interface TodoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string) => void
  initialTitle?: string
  initialDescription?: string
  mode?: "add" | "edit"
}

export default function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  mode = "add"
}: TodoModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm transition-opacity z-50">
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div ref={modalRef} className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Cerrar</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="w-full">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                {mode === "add" ? "Agregar nueva tarea" : "Editar tarea"}
              </h3>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <TodoInput
                  id="title"
                  label="Título"
                  value={title}
                  onChange={setTitle}
                  type="text"
                />

                <TodoInput
                  id="description"
                  label="Descripción"
                  value={description}
                  onChange={setDescription}
                  type="textarea"
                />

                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:w-auto"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                  >
                    {mode === "add" ? "Agregar" : "Guardar cambios"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}