"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import TodoInput from "@/components/todo/TodoInput";
import TodoSelect from "@/components/todo/TodoSelect";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useTodo } from "@/hooks/useTodo";
import TodoStatus from "@/utils/enums/TodoStatus.enum";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoModal({ isOpen, onClose }: TodoModalProps) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.PENDING);
  const { createTodo, updateTodo, updateTodoStatus, selectedTodo, clearSelectedTodo } = useTodo();
  const { user } = useAuth();

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setStatus(TodoStatus.PENDING);
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setStatus(selectedTodo.status);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    if (selectedTodo) {
      if (title !== selectedTodo.title || description !== selectedTodo.description) {
        await updateTodo({
          id: selectedTodo.id,
          title,
          description
        });
      }

      if (status !== selectedTodo.status) {
        await updateTodoStatus({
          id: selectedTodo.id,
          status
        });
      }
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
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedTodo ? "Edit Task" : "New Task"}
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
            label="Title"
            value={title}
            onChange={setTitle}
            type="text"
            required
          />
          <TodoInput
            id="description"
            label="Description"
            value={description}
            onChange={setDescription}
            type="textarea"
            required
          />
          {selectedTodo && (
            <TodoSelect
              id="status"
              label="Status"
              value={status}
              onChange={setStatus}
            />
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              label="Cancel"
            />
            <Button
              type="submit"
              label={selectedTodo ? "Update" : "Create"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}