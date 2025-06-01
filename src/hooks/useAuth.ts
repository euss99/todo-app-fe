import { useEffect, useState } from "react";

import { AuthUseCases } from "@/contexts/auth/application/useCases/authUseCases";
import { ApiAuthRepository } from "@/contexts/auth/infrastructure/repositories/ApiAuthRepository";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import StorageKey from "@/utils/enums/StorageKey.enum";

const authRepository = new ApiAuthRepository();
const authUseCases = new AuthUseCases(authRepository);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useToast();
  const { user, token, isAuthenticated, setToken, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const storedToken = localStorage.getItem(StorageKey.AUTH_TOKEN);
        if (storedToken) {
          const currentUser = await authUseCases.getCurrentUser();
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