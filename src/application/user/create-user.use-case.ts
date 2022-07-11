import { User, UserProps } from "../../domain/user/user.entity"
import { UserRepositoryInterface } from "../../domain/user/user.repository";

export interface CreateUserOutput {
  id: string;
  name: string, 
  email: string | null,
  phones: string | null,
  isActive: boolean,
}

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}
  
  async execute(input: UserProps): Promise<CreateUserOutput> {
    const user = User.create(input);
    await this.userRepo.insert(user);
    return user.toJSON();
  }
}