import { injectable } from "tsyringe";
import { IUsersRepository } from "../../domain/contexts/accounts/repositories/contracts/IUsersRepository";
import { ICreateUserDTO } from "../../domain/contexts/accounts/dtos/ICreateUserDTO";
import { User } from "../../domain/contexts/accounts/entities/User";
import { Repository } from "sequelize-typescript";
import sequelize from "..";
import { IPaymentsRepository } from "../../domain/contexts/payments/repositories/contracts/IPaymentsRepository";
import { IOrdersRepository } from "../../domain/contexts/orders/repositories/contracts/IOrdersRepository";
import { Order } from "../../domain/contexts/orders/entities/Order";
import { ICreateOrderDTO } from "../../domain/contexts/orders/dtos/ICreateOrderDTO";

@injectable()
class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>

  constructor() {
    this.repository = sequelize.getRepository(Order)
  }
  async create({ cartId, price, qtdNumbers, userId }: Omit<ICreateOrderDTO, "payment">): Promise<Order> {
    return await this.repository.create({
      cartId,
      userId,
      price,
      isPayed: false
    })
  }

}
export { OrdersRepository }