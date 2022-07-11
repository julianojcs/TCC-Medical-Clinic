import { User } from "./user.entity";

// Dependence Invertion
export interface UserRepositoryInterface {
  insert(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}