import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO"
import { Order } from "../../entities/Order"

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>
}
export { IOrdersRepository }