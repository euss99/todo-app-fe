import { AuthResponse, User } from "@/contexts/auth/domain/entities/AuthResponse";

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthResponse>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}