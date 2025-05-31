import axios from "axios";

import { AuthResponse, User } from "@/contexts/auth/domain/entities/AuthResponse";
import { AuthRepository } from "@/contexts/auth/domain/repositories/AuthRepository";
import StorageKey from "@/utils/enums/StorageKey.enum";

export class ApiAuthRepository implements AuthRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${this.API_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem(StorageKey.AUTH_TOKEN, token);

      return { token, user };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem(StorageKey.AUTH_TOKEN);
      if (!token) return null;

      const response = await axios.get<User>(`${this.API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem(StorageKey.AUTH_TOKEN);
  }
}