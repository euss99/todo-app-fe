import { useState } from "react";

import { AuthUseCases } from "@/contexts/auth/application/useCases/authUseCases";
import { ApiAuthRepository } from "@/contexts/auth/infrastructure/repositories/ApiAuthRepository";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";

const authRepository = new ApiAuthRepository();
const authUseCases = new AuthUseCases(authRepository);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useToast();
  const { user, token, isAuthenticated, setToken, setUser, clearAuth } = useAuthStore();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authUseCases.login(email, password);
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
      await authUseCases.logout();
      clearAuth();
    } catch (error) {
      showErrorToast(error);
      throw error;
    }
  };

  return {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated
  };
};