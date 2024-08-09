import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "../../domain/contexts/auth/useCases/authenticate/AuthenticateUserUseCase";

class AuthenticareUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const result = await authenticateUserUseCase.execute({ email, password });
    return response.status(201).json(result)
  }
}
export { AuthenticareUserController }