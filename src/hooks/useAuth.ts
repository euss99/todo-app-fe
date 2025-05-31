import { useEffect, useState } from "react";

import { AuthUseCases } from "@/contexts/auth/application/useCases/authUseCases";
import { AuthRepositoryImpl } from "@/contexts/auth/infrastructure/repositories/AuthRepositoryImpl";
import { useAuthStore } from "@/store/authStore";

const authRepository = new AuthRepositoryImpl();
const authUseCases = new AuthUseCases(authRepository);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, isAuthenticated, setToken, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = localStorage.getItem("auth_token");
        console.log("Stored token:", storedToken);

        if (storedToken) {
          const currentUser = await authUseCases.getCurrentUser();
          console.log("Current user from API:", currentUser);

          if (currentUser) {
            setToken(storedToken);
            setUser(currentUser);
            console.log("Auth state updated:", { token: storedToken, user: currentUser });
          } else {
            console.log("No current user found, clearing auth");
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
      console.log("Login response:", response);

      setToken(response.token);
      setUser(response.user);
      console.log("Auth state after login:", { token: response.token, user: response.user });

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authUseCases.logout();
      clearAuth();
      console.log("Auth state cleared after logout");
    } catch (error) {
      console.error("Logout error:", error);
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