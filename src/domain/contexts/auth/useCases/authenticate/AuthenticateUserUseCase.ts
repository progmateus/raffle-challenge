
import { compare, hash } from "bcryptjs"
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken"
import dayjs from "dayjs";
import { IUsersTokensRepository } from "../../repositories/contracts/IUsersTokensRepository";
import { IUsersRepository } from "../../../accounts/repositories/contracts/IUsersRepository";
import { AppError } from "../../../../../shared/errors/AppError";
import { auth } from "../../../../../shared/config/auth";


interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    id: number,
    email: string
  },
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("ERR_INVALID_CREDENTIALS", 401)
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("ERR_INVALID_CREDENTIALS", 401)
    }

    const {
      expires_in_token,
      expires_in_refresh_token,
      refresh_token_expires_days,
      secret_token,
      secret_refresh_token
    } = auth

    const token = sign({
      subject: user.id,
      expiresIn: expires_in_token
    }, secret_token, {});

    const refresh_token = sign({
      subject: user.id,
      expiresIn: expires_in_refresh_token
    }, secret_refresh_token, {})

    const refresh_token_expires_date = dayjs().add(refresh_token_expires_days, "days").toDate()

    const tokenReturn: IResponse = {
      token,
      user: {
        id: user.id,
        email: user.email
      },
      refresh_token,

    };

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: refresh_token,
      expiresDate: refresh_token_expires_date
    })

    return tokenReturn
  }
}
export { AuthenticateUserUseCase }