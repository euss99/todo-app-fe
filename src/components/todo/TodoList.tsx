"use client";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";

import TodoCard from "@/components/todo/TodoCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Pagination from "@/components/ui/Pagination";
import { useAuth } from "@/hooks/useAuth";
import { useTodo } from "@/hooks/useTodo";
import { useModalStore } from "@/store/modalStore";

const ITEMS_PER_PAGE = 3;

export default function TodoList() {
  const { user } = useAuth();
  const { todos, isLoading, getTodos, shouldRefetch, selectTodo, deleteTodo } = useTodo();
  const { openModal } = useModalStore();
  const [currentPage, setCurrentPage] = useState(1);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [todos]);

  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedTodos, currentPage]);

  const totalPages = Math.ceil(sortedTodos.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchTodos = async () => {
      if (user?.id && shouldRefetch()) {
        try {
          await getTodos(user.id);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      }
    };

    fetchTodos();
  }, [getTodos, shouldRefetch, user]);

  const handleEdit = (todo: typeof todos[0]) => {
    selectTodo(todo);
    openModal();
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;

    const isLastTodoOnPage = paginatedTodos.length === 1;
    const isNotFirstPage = currentPage > 1;

    if (isLastTodoOnPage && isNotFirstPage) {
      setCurrentPage(currentPage - 1);
    }

    await deleteTodo(id);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!todos.length) {
    return (
      <div className="text-center py-12 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ClipboardDocumentListIcon className="w-16 h-16 text-gray-400 dark:text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your task list is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Get started by adding your first task. Click the &quot;Add Task&quot; button above to create a new task.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {paginatedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            date={new Date(todo.createdAt)}
            status={todo.status}
            onEdit={() => handleEdit(todo)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}