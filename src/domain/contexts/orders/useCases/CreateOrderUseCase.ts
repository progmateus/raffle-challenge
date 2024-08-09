import { inject } from "tsyringe";
import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { IOrdersRepository } from "../repositories/contracts/IOrdersRepository";

class CreateOrderUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) { }
  async execute({ qtdNumbers, userId, price }: ICreateOrderDTO) {
    await this.ordersRepository.create({
      qtdNumbers,
      userId,
      price
    })
  }
}
export { CreateOrderUseCase }