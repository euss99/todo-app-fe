"use client";

import { useEffect } from "react";

import TodoCard from "@/components/todo/TodoCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useTodo } from "@/hooks/useTodo";

export default function TodoList() {
  const { user } = useAuth();
  const { todos, getTodos, isLoading, shouldRefetch } = useTodo();

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!todos.length) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
        No hay tareas pendientes
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          title={todo.title}
          description={todo.description}
          date={new Date(todo.createdAt)}
          status={todo.status}
          onEdit={() => {}}
        />
      ))}
    </div>
  );
}