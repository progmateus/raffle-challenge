
import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken"
import dayjs from "dayjs";
import { AppError } from "../../../../../shared/errors/AppError";
import { auth } from "../../../../../shared/config/auth";
import { IUsersTokensRepository } from "../../repositories/contracts/IUsersTokensRepository";

interface IPayload {
  subject: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) { }

  async execute(refreshToken: string) {
    const { secret_refresh_token, refresh_token_expires_days, secret_token } = auth

    const { subject } = verify(refreshToken, secret_refresh_token) as IPayload
    const userId = subject

    const userToken = await this.usersTokensRepository.findByrefreshToken(refreshToken)

    if (!userToken) {
      throw new AppError("ERR_REFRESH_TOKEN_NOT_FOUND")
    }

    await userToken.destroy()

    const newRefreshToken = sign(
      {
        subject,
        expiresIn: auth.expires_in_refresh_token
      },
      secret_refresh_token,
      {}
    )

    const expiresDate = dayjs().add(refresh_token_expires_days, "days").toDate()

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken: newRefreshToken,
      userId: +userId
    })

    const newToken = sign({
      subject: userId,
      expiresIn: auth.expires_in_token
    }, secret_token, {}
    );

    return {
      refreshToken,
      token: newToken
    }
  }
}
export { RefreshTokenUseCase }