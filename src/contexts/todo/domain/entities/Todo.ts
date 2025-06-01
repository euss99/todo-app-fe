import TodoStatus from "@/utils/enums/TodoStatus.enum";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoInput {
  title: string;
  description: string;
  userId: string;
}

export interface UpdateTodoInput {
  id: string;
  title: string;
  description: string;
}

export interface UpdateTodoStatusInput {
  id: string;
  status: TodoStatus;
}