import { Todo, UpdateTodoStatusInput } from "../../domain/entities/Todo";
import { TodoRepository } from "../../domain/repositories/TodoRepository";

export class UpdateTodoStatusUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoStatusInput): Promise<Todo> {
    return this.todoRepository.updateTodoStatus(input);
  }
}