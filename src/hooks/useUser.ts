import { useState } from "react";

import { UserUseCases } from "@/contexts/user/application/useCases/userUseCases";
import { UserInput } from "@/contexts/user/domain/entities/UserInput";
import { GraphQLUserRepository } from "@/contexts/user/infrastructure/graphql/GraphQLUserRepository";
import { useToast } from "@/hooks/useToast";

export function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast, showSuccessToast } = useToast();
  const userRepository = new GraphQLUserRepository();
  const userUseCases = new UserUseCases(userRepository);

  const createUser = async (input: UserInput) => {
    setIsLoading(true);
    try {
      const user = await userUseCases.createUser(input);
      showSuccessToast("Usuario creado con exito");
      return user;
    } catch (error) {
      showErrorToast(error);
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