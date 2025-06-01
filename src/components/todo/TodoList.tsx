"use client";

import { useEffect, useMemo } from "react";

import TodoCard from "@/components/todo/TodoCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useTodo } from "@/hooks/useTodo";
import { useModalStore } from "@/store/modalStore";

export default function TodoList() {
  const { user } = useAuth();
  const { todos, getTodos, isLoading, shouldRefetch, selectTodo, deleteTodo } = useTodo();
  const { openModal } = useModalStore();

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [todos]);

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
  }, [user?.id, getTodos, shouldRefetch]);

  const handleEdit = (todo: typeof todos[0]) => {
    selectTodo(todo);
    openModal();
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;

    await deleteTodo(id);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!todos.length) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
        No pending tasks
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTodos.map((todo) => (
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
  );
}