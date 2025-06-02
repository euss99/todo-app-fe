import { useMemo, useState } from "react";

import LoginUseCase from "@/contexts/auth/application/useCases/LoginUseCase";
import LogoutUseCase from "@/contexts/auth/application/useCases/LogoutUseCase";
import { ApiAuthRepository } from "@/contexts/auth/infrastructure/repositories/ApiAuthRepository";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { useTodoStore } from "@/store/todoStore";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useToast();
  const { user, token, isAuthenticated, setToken, setUser, clearAuth } = useAuthStore();
  const { clearTodos } = useTodoStore();

  const authRepository = useMemo(() => new ApiAuthRepository(), []);
  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), [authRepository]);
  const logoutUseCase = useMemo(() => new LogoutUseCase(authRepository), [authRepository]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUseCase.execute(email, password);
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      showErrorToast(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUseCase.execute();
      clearAuth();
      clearTodos();
    } catch (error) {
      showErrorToast(error);
      throw error;
    }
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    setToken,
    clearAuth,
    setUser
  };
};