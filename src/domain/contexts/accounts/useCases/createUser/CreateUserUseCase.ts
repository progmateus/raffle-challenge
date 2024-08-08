import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcryptjs";
import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";
import { AppError } from "../../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, password }: ICreateUserDTO) {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new AppError("ERR_USER_ALREADY_EXISTS", 409)
    }

    const passwordHash = await hash(password, 8)
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })
  }
}
export { CreateUserUseCase }