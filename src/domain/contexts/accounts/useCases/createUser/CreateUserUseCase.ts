import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";
import { AppError } from "../../../../../shared/errors/AppError";
import { IBcryptHasherProvider } from "../../providers/criptography/IBcryptHasherProvider";
import { User } from "../../entities/User";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("BcryptHasherProvider")
    private bcryptHasherProvider: IBcryptHasherProvider
  ) { }

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new AppError("ERR_USER_ALREADY_EXISTS", 409)
    }

    const passwordHash = await this.bcryptHasherProvider.hash(password)
    return await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })
  }
}
export { CreateUserUseCase }