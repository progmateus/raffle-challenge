import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";
import { AppError } from "../../../../../shared/errors/AppError";
import { IBcryptHasher } from "../../utils/criptography/IBCryptHasher";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("BcryptHasher")
    private bcryptHasher: IBcryptHasher
  ) { }

  async execute({ name, email, password }: ICreateUserDTO) {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new AppError("ERR_USER_ALREADY_EXISTS", 409)
    }

    const passwordHash = await this.bcryptHasher.hash(password)
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })
  }
}
export { CreateUserUseCase }