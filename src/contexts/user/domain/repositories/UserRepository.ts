import { User } from "@/contexts/user/domain/entities/User";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserRepository {
  createUser(input: CreateUserInput): Promise<User>;
}