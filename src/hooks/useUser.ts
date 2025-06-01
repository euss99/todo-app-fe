import { useState } from "react";

import CreateUserUseCase from "@/contexts/user/application/useCases/CreateUserUseCase";
import { UserInput } from "@/contexts/user/domain/entities/UserInput";
import { GraphQLUserRepository } from "@/contexts/user/infrastructure/graphql/GraphQLUserRepository";
import { useToast } from "@/hooks/useToast";

const userRepository = new GraphQLUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

export function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast, showSuccessToast } = useToast();

  const createUser = async (input: UserInput) => {
    setIsLoading(true);
    try {
      const user = await createUserUseCase.execute(input);
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