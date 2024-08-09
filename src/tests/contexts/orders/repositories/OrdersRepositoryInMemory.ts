import { ICreateOrderDTO } from "../../../../domain/contexts/orders/dtos/ICreateOrderDTO";
import { Cart } from "../../../../domain/contexts/orders/entities/Cart";
import { Order } from "../../../../domain/contexts/orders/entities/Order";
import { IOrdersRepository } from "../../../../domain/contexts/orders/repositories/contracts/IOrdersRepository";
import { IGenerateRedeemDTO } from "../../../../domain/contexts/redeems/dtos/IGenerateRedeemDTO";
import { Redeem } from "../../../../domain/contexts/redeems/entites/Redeem";
import { IRedeemsRepository } from "../../../../domain/contexts/redeems/repositories/contracts/IRedeemsRepository";

class OrdersRepositoryInMemory implements IOrdersRepository {
  orders: Order[] = [];

  async create({ cartId, price }: Omit<ICreateOrderDTO, "payment" | "qtdNumbers" | "userId">): Promise<Order> {
    const order = {
      id: 1,
      cartId,
      isPayed: false,
      price,
    } as Order;
    this.orders.push(order)
    return order;
  }
}
export { OrdersRepositoryInMemory };