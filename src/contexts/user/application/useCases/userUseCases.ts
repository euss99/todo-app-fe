import { User } from "@/contexts/user/domain/entities/User";
import { CreateUserInput, UserRepository } from "@/contexts/user/domain/repositories/UserRepository";

export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInput): Promise<User> {
    return this.userRepository.createUser(input);
  }
}