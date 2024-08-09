import { IGenerateRedeemDTO } from "../../../../domain/contexts/redeems/dtos/IGenerateRedeemDTO";
import { Redeem } from "../../../../domain/contexts/redeems/entites/Redeem";
import { IRedeemsRepository } from "../../../../domain/contexts/redeems/repositories/contracts/IRedeemsRepository";

class RedeemsrepositoryInMemory implements IRedeemsRepository {
  redeems: Redeem[] = [];

  async findByNumbers(numbers: string[]): Promise<Redeem[]> {
    return this.redeems.filter((r) => numbers.includes(r.number))
  }
  async bulkCreate(data: IGenerateRedeemDTO[]): Promise<void> {
    data.map((r) => {
      const redeem = {
        number: r.number,
        userId: r.userId,
      } as Redeem
      this.redeems.push(redeem)
    })

  }
}
export { RedeemsrepositoryInMemory };