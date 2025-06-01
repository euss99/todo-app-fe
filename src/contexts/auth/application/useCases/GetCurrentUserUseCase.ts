import { AuthRepository } from "@/contexts/auth/domain/repositories/AuthRepository";
import { User } from "@/contexts/user/domain/entities/User";

export default class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}