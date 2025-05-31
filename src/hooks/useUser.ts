import { useState } from "react";

import { UserUseCases } from "@/contexts/user/application/useCases/userUseCases";
import { CreateUserInput } from "@/contexts/user/domain/repositories/UserRepository";
import { GraphQLUserRepository } from "@/contexts/user/infrastructure/repositories/GraphQLUserRepository";

const userRepository = new GraphQLUserRepository();
const userUseCases = new UserUseCases(userRepository);

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (input: CreateUserInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await userUseCases.createUser(input);
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al crear el usuario";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    isLoading,
    error
  };
};