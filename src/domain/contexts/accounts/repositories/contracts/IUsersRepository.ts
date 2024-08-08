import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: number): Promise<User>
  findByEmail(email: string): Promise<User>
}

export { IUsersRepository }