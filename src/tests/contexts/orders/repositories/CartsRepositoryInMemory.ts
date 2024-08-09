import { Cart } from "../../../../domain/contexts/orders/entities/Cart";
import { ICartsRepository } from "../../../../domain/contexts/orders/repositories/contracts/ICartsRepository";

class CartsRepositoryInMemory implements ICartsRepository {
  carts: Cart[] = [];


  async create(userId: number): Promise<Cart> {
    const cart = {
      id: 1,
      userId
    } as Cart;

    this.carts.push(cart)
    return cart;
  }

}
export { CartsRepositoryInMemory };