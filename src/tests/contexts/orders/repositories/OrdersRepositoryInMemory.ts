import { ICreateOrderDTO } from "../../../../domain/contexts/orders/dtos/ICreateOrderDTO";
import { Cart } from "../../../../domain/contexts/orders/entities/Cart";
import { Order } from "../../../../domain/contexts/orders/entities/Order";
import { IOrdersRepository } from "../../../../domain/contexts/orders/repositories/contracts/IOrdersRepository";
import { IGenerateRedeemDTO } from "../../../../domain/contexts/redeems/dtos/IGenerateRedeemDTO";
import { Redeem } from "../../../../domain/contexts/redeems/entites/Redeem";
import { IRedeemsRepository } from "../../../../domain/contexts/redeems/repositories/contracts/IRedeemsRepository";

class OrdersRepositoryInMemory implements IOrdersRepository {
  async finById(id: number): Promise<Order> {
    return this.orders.find((o) => o.id === id)
  }
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

  async informPayment(orderId: number, paymentId: number): Promise<void> {
    const index = this.orders.findIndex((o) => o.id === orderId)
    if (index !== -1) {
      const newOrder = {
        id: this.orders[index].id,
        cartId: this.orders[index].cartId,
        isPayed: true,
        price: this.orders[index].price,
        paymentId: paymentId,
        createdAt: this.orders[index].createdAt,
        updatedAt: new Date()
      } as Order
      this.orders[index] = newOrder
    }
  }
}
export { OrdersRepositoryInMemory };