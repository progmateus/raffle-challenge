import { injectable } from "tsyringe";
import { Repository } from "sequelize-typescript";
import sequelize from "..";
import { ICartsRepository } from "../../domain/contexts/orders/repositories/contracts/ICartsRepository";
import { Cart } from "../../domain/contexts/orders/entities/Cart";

@injectable()
class CartsRepository implements ICartsRepository {
  private repository: Repository<Cart>

  constructor() {
    this.repository = sequelize.getRepository(Cart)
  }
  async create(userId: number): Promise<Cart> {
    return this.repository.create({
      userId
    })
  }

}
export { CartsRepository }