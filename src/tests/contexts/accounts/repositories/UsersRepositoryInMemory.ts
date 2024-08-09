import { ICreateUserDTO } from "../../../../domain/contexts/accounts/dtos/ICreateUserDTO";
import { User } from "../../../../domain/contexts/accounts/entities/User";
import { IUsersRepository } from "../../../../domain/contexts/accounts/repositories/contracts/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password
    })
    this.users.push(user)
    return user;
  }
  async findById(id: number): Promise<User> {
    return this.users.find((u) => u.id === id)
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email)
  }
}
export { UsersRepositoryInMemory };