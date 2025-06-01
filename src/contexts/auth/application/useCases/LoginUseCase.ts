import { AuthResponse } from "@/contexts/auth/domain/entities/AuthResponse";
import { AuthRepository } from "@/contexts/auth/domain/repositories/AuthRepository";

export default class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResponse> {
    return this.authRepository.login(email, password);
  }
}