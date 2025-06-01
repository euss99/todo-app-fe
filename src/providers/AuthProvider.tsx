"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useCallback,useEffect, useState } from "react";

import LoadingScreen from "@/components/ui/LoadingScreen";
import { AuthUseCases } from "@/contexts/auth/application/useCases/authUseCases";
import { ApiAuthRepository } from "@/contexts/auth/infrastructure/repositories/ApiAuthRepository";
import { useAuthStore } from "@/store/authStore";
import RouteName from "@/utils/enums/RouteName.enum";
import StorageKey from "@/utils/enums/StorageKey.enum";

const authRepository = new ApiAuthRepository();
const authUseCases = new AuthUseCases(authRepository);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { setToken, setUser, clearAuth } = useAuthStore();
  const router = useRouter();

  const forceLogOut = useCallback(() => {
    localStorage.removeItem(StorageKey.AUTH_TOKEN);
    clearAuth();
    router.push(RouteName.LOGIN);
  }, [clearAuth, router]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = localStorage.getItem(StorageKey.AUTH_TOKEN);
        if (storedToken) {
          const currentUser = await authUseCases.getCurrentUser();
          if (currentUser) {
            setToken(storedToken);
            setUser(currentUser);
          } else {
            forceLogOut();
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        forceLogOut();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [setToken, setUser, clearAuth, router, forceLogOut]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}