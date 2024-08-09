import { ICreateOrderDTO } from "../../../../domain/contexts/orders/dtos/ICreateOrderDTO";
import { Cart } from "../../../../domain/contexts/orders/entities/Cart";
import { Order } from "../../../../domain/contexts/orders/entities/Order";
import { IOrdersRepository } from "../../../../domain/contexts/orders/repositories/contracts/IOrdersRepository";
import { IGenerateRedeemDTO } from "../../../../domain/contexts/redeems/dtos/IGenerateRedeemDTO";
import { Redeem } from "../../../../domain/contexts/redeems/entites/Redeem";
import { IRedeemsRepository } from "../../../../domain/contexts/redeems/repositories/contracts/IRedeemsRepository";

class RedeemsRepositoryInMemory implements IRedeemsRepository {
  redeems: Redeem[] = [];

  async findByNumbers(numbers: string[]): Promise<Redeem[]> {
    return this.redeems.filter(r => numbers.includes(r.number))
  }
  async bulkCreate(data: IGenerateRedeemDTO[]): Promise<void> {
    const newRedeems = data.map((r) => {
      return {
        cartId: r.cartId,
        number: r.number,
        userId: r.userId
      }
    }) as Redeem[]

    this.redeems.push(...newRedeems)
  }

}
export { RedeemsRepositoryInMemory };