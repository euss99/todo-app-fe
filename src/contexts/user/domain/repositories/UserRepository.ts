import { User } from "@/contexts/user/domain/entities/User";
import { UserInput } from "@/contexts/user/domain/entities/UserInput";

export interface UserRepository {
  createUser(input: UserInput): Promise<User>;
}