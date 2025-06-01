import { ApolloClient, InMemoryCache } from "@apollo/client";

import { User } from "@/contexts/user/domain/entities/User";
import { UserInput } from "@/contexts/user/domain/entities/UserInput";
import { UserRepository } from "@/contexts/user/domain/repositories/UserRepository";
import { CREATE_USER_MUTATION } from "@/contexts/user/infrastructure/graphql/mutations";

export class GraphQLUserRepository implements UserRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  private readonly client = new ApolloClient({
    uri: `${this.API_URL}/graphql`,
    cache: new InMemoryCache()
  });

  async createUser(input: UserInput): Promise<User> {
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