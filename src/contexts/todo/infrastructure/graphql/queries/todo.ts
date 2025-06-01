import { gql } from "@apollo/client";

export const GET_TODOS_QUERY = gql`
  query GetTodos($userId: String!) {
    todosByUser(userId: $userId) {
      id
      title
      description
      userId
      status
      createdAt
    }
  }
`;

export const CREATE_TODO_MUTATION = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      status
      userId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      title
      description
      status
      userId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TODO_STATUS_MUTATION = gql`
  mutation UpdateTodoStatus($input: UpdateTodoStatusInput!) {
    updateTodoStatus(input: $input) {
      id
      title
      description
      status
      userId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;