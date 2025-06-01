import { TodoRepository } from "@/contexts/todo/domain/repositories/TodoRepository";

export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    return this.todoRepository.deleteTodo(id);
  }
}