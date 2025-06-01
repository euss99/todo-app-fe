import { useState } from "react";

import { CreateTodoUseCase } from "@/contexts/todo/application/useCases/CreateTodoUseCase";
import { DeleteTodoUseCase } from "@/contexts/todo/application/useCases/DeleteTodoUseCase";
import { GetTodosUseCase } from "@/contexts/todo/application/useCases/GetTodosUseCase";
import { UpdateTodoStatusUseCase } from "@/contexts/todo/application/useCases/UpdateTodoStatusUseCase";
import { UpdateTodoUseCase } from "@/contexts/todo/application/useCases/UpdateTodoUseCase";
import { CreateTodoInput, UpdateTodoInput, UpdateTodoStatusInput } from "@/contexts/todo/domain/entities/Todo";
import { GraphQLTodoRepository } from "@/contexts/todo/infrastructure/graphql/GraphQLTodoRepository";
import { useToast } from "@/hooks/useToast";
import { useTodoStore } from "@/store/todoStore";

const todoRepository = new GraphQLTodoRepository();
const getTodosUseCase = new GetTodosUseCase(todoRepository);
const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
const updateTodoStatusUseCase = new UpdateTodoStatusUseCase(todoRepository);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

export function useTodo() {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useToast();
  const {
    todos,
    selectedTodo,
    shouldRefetch,
    setTodos,
    addTodo,
    updateTodo: updateTodoInStore,
    removeTodo,
    setLastFetched,
    selectTodo,
    clearSelectedTodo
  } = useTodoStore();

  const getTodos = async (userId: string) => {
    if (!shouldRefetch()) return;

    try {
      setIsLoading(true);
      const todos = await getTodosUseCase.execute(userId);
      setTodos(todos);
      setLastFetched(Date.now());
      return todos;
    } catch (error) {
      showErrorToast("Error al cargar las tareas");
      console.error("Error getting todos:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createTodo = async (input: CreateTodoInput) => {
    try {
      setIsLoading(true);
      const newTodo = await createTodoUseCase.execute(input);
      addTodo(newTodo);
      return newTodo;
    } catch (error) {
      showErrorToast("Error al crear la tarea");
      console.error("Error creating todo:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (input: UpdateTodoInput) => {
    try {
      setIsLoading(true);
      const updatedTodo = await updateTodoUseCase.execute(input);
      updateTodoInStore(updatedTodo);
      return updatedTodo;
    } catch (error) {
      showErrorToast("Error al actualizar la tarea");
      console.error("Error updating todo:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodoStatus = async (input: UpdateTodoStatusInput) => {
    try {
      setIsLoading(true);
      const updatedTodo = await updateTodoStatusUseCase.execute(input);
      updateTodoInStore(updatedTodo);
      return updatedTodo;
    } catch (error) {
      showErrorToast("Error al actualizar el estado de la tarea");
      console.error("Error updating todo status:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTodoUseCase.execute(id);
      removeTodo(id);
    } catch (error) {
      showErrorToast("Error al eliminar la tarea");
      console.error("Error deleting todo:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    todos,
    selectedTodo,
    isLoading,
    shouldRefetch,
    // Actions
    getTodos,
    createTodo,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
    selectTodo,
    clearSelectedTodo
  };
}