import { CreateTodoInput, Todo, UpdateTodoInput, UpdateTodoStatusInput } from "../entities/Todo";

export interface TodoRepository {
  getTodos(userId: string): Promise<Todo[]>;
  createTodo(input: CreateTodoInput): Promise<Todo>;
  updateTodo(input: UpdateTodoInput): Promise<Todo>;
  updateTodoStatus(input: UpdateTodoStatusInput): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}