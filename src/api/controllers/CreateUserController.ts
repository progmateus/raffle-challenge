import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../../domain/contexts/accounts/useCases/createUser/CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createuserUseCase = container.resolve(CreateUserUseCase)
    await createuserUseCase.execute({ name, email, password });
    return response.status(201).json({ message: "CREATED" })
  }
}
export { CreateUserController }