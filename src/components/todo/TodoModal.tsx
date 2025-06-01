"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

import TodoInput from "@/components/todo/TodoInput";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useTodo } from "@/hooks/useTodo";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoModal({ isOpen, onClose }: TodoModalProps) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { createTodo, updateTodo, selectedTodo, clearSelectedTodo } = useTodo();
  const { user } = useAuth();

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    } else {
      resetForm();
    }
  }, [selectedTodo, resetForm]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      clearSelectedTodo();
    }
  }, [isOpen, resetForm, clearSelectedTodo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    if (selectedTodo) {
      await updateTodo({
        id: selectedTodo.id,
        title,
        description
      });
    } else {
      await createTodo({
        title,
        description,
        userId: user.id
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm transition-opacity flex items-center justify-center p-4 z-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedTodo ? "Editar tarea" : "Nueva tarea"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TodoInput
            id="title"
            label="Título"
            value={title}
            onChange={setTitle}
            type="text"
            required
          />
          <TodoInput
            id="description"
            label="Descripción"
            value={description}
            onChange={setDescription}
            type="textarea"
            required
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              label="Cancelar"
            />
            <Button
              type="submit"
              label={selectedTodo ? "Actualizar" : "Crear"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}