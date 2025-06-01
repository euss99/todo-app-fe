import { useEffect, useState } from "react";

import { AuthUseCases } from "@/contexts/auth/application/useCases/authUseCases";
import { ApiAuthRepository } from "@/contexts/auth/infrastructure/repositories/ApiAuthRepository";
import { useError } from "@/hooks/useError";
import { useAuthStore } from "@/store/authStore";
import StorageKey from "@/utils/enums/StorageKey.enum";

const authRepository = new ApiAuthRepository();
const authUseCases = new AuthUseCases(authRepository);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();
  const { user, token, isAuthenticated, setToken, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = localStorage.getItem(StorageKey.AUTH_TOKEN);
        if (storedToken) {
          const currentUser = await authUseCases.getCurrentUser();
          console.log({currentUser});
          if (currentUser) {
            setToken(storedToken);
            setUser(currentUser);
          } else {
            clearAuth();
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [setToken, setUser, clearAuth]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authUseCases.login(email, password);
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      showError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authUseCases.logout();
      clearAuth();
    } catch (error) {
      showError(error);
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