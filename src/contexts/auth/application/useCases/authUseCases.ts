import { AuthResponse,User } from "@/contexts/auth/domain/entities/AuthResponse";
import { AuthRepository } from "@/contexts/auth/domain/repositories/AuthRepository";

export class AuthUseCases {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.authRepository.login(email, password);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }

  async logout(): Promise<void> {
    return this.authRepository.logout();
  }
}