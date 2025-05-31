import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "../contexts/auth/domain/entities/AuthResponse";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setToken: (token: string) =>
        set(
          {
            token,
            isAuthenticated: true
          },
          false,
          "setToken"
        ),
      setUser: (user: User) =>
        set(
          {
            user,
            isAuthenticated: true
          },
          false,
          "setUser"
        ),
      clearAuth: () =>
        set(
          {
            user: null,
            token: null,
            isAuthenticated: false
          },
          false,
          "clearAuth"
        ),
    }),
    {
      name: "auth-store"
    }
  )
);