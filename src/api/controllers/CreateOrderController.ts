import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../../domain/contexts/accounts/useCases/createUser/CreateUserUseCase";
import { CreateOrderUseCase } from "../../domain/contexts/orders/useCases/CreateOrderUseCase";

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { payment, qtdNumbers, userId } = request.body;
    const createOrderUseCase = container.resolve(CreateOrderUseCase)
    await createOrderUseCase.execute({ payment, qtdNumbers, userId });
    return response.status(201).json({ message: "CREATED" })
  }
}
export { CreateOrderController }