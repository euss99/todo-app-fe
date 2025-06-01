import { CreateTodoInput, Todo } from "@/contexts/todo/domain/entities/Todo";
import { TodoRepository } from "@/contexts/todo/domain/repositories/TodoRepository";

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    return this.todoRepository.createTodo(input);
  }
}