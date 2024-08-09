import { injectable } from "tsyringe";
import { IUsersRepository } from "../../domain/contexts/accounts/repositories/contracts/IUsersRepository";
import { ICreateUserDTO } from "../../domain/contexts/accounts/dtos/ICreateUserDTO";
import { User } from "../../domain/contexts/accounts/entities/User";
import { Repository } from "sequelize-typescript";
import sequelize from "..";

@injectable()
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = sequelize.getRepository(User)
  }

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    return await this.repository.create({
      name, email, password
    })
  }
  async findById(id: number): Promise<User> {
    return await this.repository.findByPk(id)
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({
      where: {
        email
      }
    })
  }

}
export { UsersRepository }