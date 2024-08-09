import { ICreateUserDTO } from "../../../../domain/contexts/accounts/dtos/ICreateUserDTO";
import { User } from "../../../../domain/contexts/accounts/entities/User";
import { IUsersRepository } from "../../../../domain/contexts/accounts/repositories/contracts/IUsersRepository";
import { ICreateRedeemDTO } from "../../../../domain/contexts/reedems/dtos/ICreateReedemDTO";
import { IGenerateReedemDTO } from "../../../../domain/contexts/reedems/dtos/IGenerateReedemDTO";
import { Redeem } from "../../../../domain/contexts/reedems/entites/Redeem";
import { IRedeemsRepository } from "../../../../domain/contexts/reedems/repositories/contracts/IRedeemsRepository";

class RedeemsrepositoryInMemory implements IRedeemsRepository {
  redeems: Redeem[] = [];

  async findByNumbers(numbers: string[]): Promise<Redeem[]> {
    return this.redeems.filter((r) => numbers.includes(r.number))
  }
  async bulkCreate(data: IGenerateReedemDTO[]): Promise<void> {
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