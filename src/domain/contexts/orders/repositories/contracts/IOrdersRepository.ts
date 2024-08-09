import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO"
import { Order } from "../../entities/Order"

interface IOrdersRepository {
  create(data: Omit<ICreateOrderDTO, "payment">): Promise<Order>
}
export { IOrdersRepository }