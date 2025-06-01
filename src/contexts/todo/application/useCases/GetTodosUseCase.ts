import { Todo } from "@/contexts/todo/domain/entities/Todo";
import { TodoRepository } from "@/contexts/todo/domain/repositories/TodoRepository";


export class GetTodosUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(userId: string): Promise<Todo[]> {
    return this.todoRepository.getTodos(userId);
  }
}