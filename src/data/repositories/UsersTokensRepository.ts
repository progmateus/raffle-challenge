import { injectable } from "tsyringe";
import { IUsersTokensRepository } from "../../domain/contexts/auth/repositories/contracts/IUsersTokensRepository";
import { ICreateUserTokenDTO } from "../../domain/contexts/auth/dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../../domain/contexts/auth/entities/UsersTokens";
import { Repository } from "sequelize-typescript";
import sequelize from "..";

@injectable()
class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>

  constructor() {
    this.repository = sequelize.getRepository(UsersTokens)
  }
  async create({ expiresDate, refreshToken, userId }: ICreateUserTokenDTO): Promise<UsersTokens> {
    return await this.repository.create({
      expiresDate, refreshToken, userId
    })
  }
  async findByrefreshToken(refreshToken: string): Promise<UsersTokens> {
    return await this.repository.findOne({
      where: {
        refreshToken
      }
    })
  }

}
export { UsersTokensRepository }