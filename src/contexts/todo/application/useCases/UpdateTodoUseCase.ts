import { Todo, UpdateTodoInput } from "@/contexts/todo/domain/entities/Todo";
import { TodoRepository } from "@/contexts/todo/domain/repositories/TodoRepository";

export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    return this.todoRepository.updateTodo(input);
  }
}