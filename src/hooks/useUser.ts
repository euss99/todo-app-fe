import { useState } from "react";

import { UserUseCases } from "@/contexts/user/application/useCases/userUseCases";
import { CreateUserInput } from "@/contexts/user/domain/repositories/UserRepository";
import { GraphQLUserRepository } from "@/contexts/user/infrastructure/repositories/GraphQLUserRepository";
import { useError } from "@/hooks/useError";

export function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useError();
  const userRepository = new GraphQLUserRepository();
  const userUseCases = new UserUseCases(userRepository);

  const createUser = async (input: CreateUserInput) => {
    setIsLoading(true);
    try {
      return await userUseCases.createUser(input);
    } catch (error) {
      showError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    isLoading
  };
}