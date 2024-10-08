import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: number): Promise<User>
  findByEmail(email: string): Promise<User>
}

export { IUsersRepository }