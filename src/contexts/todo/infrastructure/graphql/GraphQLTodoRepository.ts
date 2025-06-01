import { ApolloClient, InMemoryCache } from "@apollo/client";

import { CreateTodoInput, Todo, UpdateTodoInput, UpdateTodoStatusInput } from "@/contexts/todo/domain/entities/Todo";
import { TodoRepository } from "@/contexts/todo/domain/repositories/TodoRepository";
import { CREATE_TODO_MUTATION, DELETE_TODO_MUTATION, GET_TODOS_QUERY, UPDATE_TODO_MUTATION, UPDATE_TODO_STATUS_MUTATION } from "@/contexts/todo/infrastructure/graphql/queries/todo";
import StorageKey from "@/utils/enums/StorageKey.enum";

export class GraphQLTodoRepository implements TodoRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  private readonly client = new ApolloClient({
    uri: `${this.API_URL}/graphql`,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageKey.AUTH_TOKEN)}`
    }
  });

  async getTodos(userId: string): Promise<Todo[]> {
    try {
      const { data } = await this.client.query({
        query: GET_TODOS_QUERY,
        variables: { userId }
      });

      return data.todosByUser;
    } catch (error) {
      console.error("Error getting todos:", error);
      throw new Error("Error al obtener las tareas");
    }
  }

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    try {
      const { data } = await this.client.mutate({
        mutation: CREATE_TODO_MUTATION,
        variables: { input }
      });

      return data.createTodo;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(input: UpdateTodoInput): Promise<Todo> {
    try {
      const { data } = await this.client.mutate({
        mutation: UPDATE_TODO_MUTATION,
        variables: { input }
      });

      return data.updateTodo;
    } catch (error) {
      throw error;
    }
  }

  async updateTodoStatus(input: UpdateTodoStatusInput): Promise<Todo> {
    try {
      const { data } = await this.client.mutate({
        mutation: UPDATE_TODO_STATUS_MUTATION,
        variables: { input }
      });

      return data.updateTodoStatus;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      await this.client.mutate({
        mutation: DELETE_TODO_MUTATION,
        variables: { id }
      });
    } catch (error) {
      throw error;
    }
  }
}