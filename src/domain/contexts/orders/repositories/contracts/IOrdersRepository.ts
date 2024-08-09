import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO"
import { Order } from "../../entities/Order"

interface IOrdersRepository {
  create(data: Omit<ICreateOrderDTO, "payment">): Promise<Order>
  informPayment(orderId: number, paymentId: number): Promise<void>
  finById(id: number): Promise<Order>
}
export { IOrdersRepository }