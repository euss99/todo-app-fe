import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Todo } from "@/contexts/todo/domain/entities/Todo";

interface TodoStore {
  todos: Todo[];
  selectedTodo: Todo | null;
  lastFetched: number | null;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  selectTodo: (todo: Todo | null) => void;
  clearSelectedTodo: () => void;
  setLastFetched: (timestamp: number) => void;
  shouldRefetch: () => boolean;
  clearTodos: () => void;
}

const FIVE_MINUTES = 5 * 60 * 1000;

export const useTodoStore = create<TodoStore>()(
  devtools(
    (set, get) => ({
      todos: [],
      selectedTodo: null,
      lastFetched: null,
      setTodos: (todos) => set({ todos }),
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      updateTodo: (todo) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === todo.id ? todo : t))
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        })),
      selectTodo: (todo) => set({ selectedTodo: todo }),
      clearSelectedTodo: () => set({ selectedTodo: null }),
      setLastFetched: (timestamp) => set({ lastFetched: timestamp }),
      shouldRefetch: () => {
        const { lastFetched } = get();
        return !lastFetched || Date.now() - lastFetched > FIVE_MINUTES;
      },
      clearTodos: () => set({ todos: [], selectedTodo: null, lastFetched: null })
    }),
    {
      name: "todo-store"
    }
  )
);