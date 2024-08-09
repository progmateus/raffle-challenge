import { injectable } from "tsyringe";
import { Repository } from "sequelize-typescript";
import sequelize from "..";
import { IOrdersRepository } from "../../domain/contexts/orders/repositories/contracts/IOrdersRepository";
import { Order } from "../../domain/contexts/orders/entities/Order";
import { ICreateOrderDTO } from "../../domain/contexts/orders/dtos/ICreateOrderDTO";

@injectable()
class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>

  constructor() {
    this.repository = sequelize.getRepository(Order)
  }
  async finById(id: number): Promise<Order> {
    return this.repository.findByPk(id);
  }
  async informPayment(orderId: number, paymentId: number): Promise<void> {
    this.repository.update(
      {
        isPayed: true,
        paymentId
      },
      {
        where: {
          id: orderId
        },

      })
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