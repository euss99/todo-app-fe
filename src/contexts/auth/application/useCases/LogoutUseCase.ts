import { AuthRepository } from "@/contexts/auth/domain/repositories/AuthRepository";

export default class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}