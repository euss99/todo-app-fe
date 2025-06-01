import { User } from "@/contexts/user/domain/entities/User";
import { UserInput } from "@/contexts/user/domain/entities/UserInput";
import { UserRepository } from "@/contexts/user/domain/repositories/UserRepository";

export default class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UserInput): Promise<User> {
    return this.userRepository.createUser(input);
  }
}