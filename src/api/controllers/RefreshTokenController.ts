import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "../../domain/contexts/auth/useCases/refreshToken/RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { token } = request.body;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const result = await refreshTokenUseCase.execute(token);
    return response.status(201).json(result)
  }
}
export { RefreshTokenController }