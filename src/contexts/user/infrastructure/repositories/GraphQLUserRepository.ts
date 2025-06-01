import { ApolloClient, gql, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

import { User } from "@/contexts/user/domain/entities/User";
import { CreateUserInput, UserRepository } from "@/contexts/user/domain/repositories/UserRepository";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      createdAt
    }
  }
`;

export class GraphQLUserRepository implements UserRepository {
  private readonly client: ApolloClient<NormalizedCacheObject>;
  private readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

  constructor() {
    this.client = new ApolloClient({
      uri: this.API_URL,
      cache: new InMemoryCache()
    });
  }

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const { data } = await this.client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: { input }
      });

      return data.createUser;
    } catch (error) {
      throw error;
    }
  }
}