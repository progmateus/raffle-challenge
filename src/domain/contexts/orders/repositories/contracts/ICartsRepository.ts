import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO"
import { Cart } from "../../entities/Cart"
import { Order } from "../../entities/Order"

interface ICartsRepository {
  create(userId: number, price: number): Promise<Cart>
}
export { ICartsRepository }