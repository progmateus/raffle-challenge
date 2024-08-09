import { injectable } from "tsyringe";
import { Repository } from "sequelize-typescript";
import sequelize from "..";
import { ICartsRepository } from "../../domain/contexts/orders/repositories/contracts/ICartsRepository";
import { Cart } from "../../domain/contexts/orders/entities/Cart";
import { IRedeemsRepository } from "../../domain/contexts/redeems/repositories/contracts/IRedeemsRepository";
import { IGenerateRedeemDTO } from "../../domain/contexts/redeems/dtos/IGenerateRedeemDTO";
import { Redeem } from "../../domain/contexts/redeems/entites/Redeem";
import { Op } from "sequelize";

@injectable()
class RedeemsRepository implements IRedeemsRepository {
  private repository: Repository<Redeem>

  constructor() {
    this.repository = sequelize.getRepository(Redeem)
  }

  async findByNumbers(numbers: string[]): Promise<Redeem[]> {
    return await this.repository.findAll({
      where: {
        number: {
          [Op.in]: numbers
        }
      }
    })
  }
  async bulkCreate(data: IGenerateRedeemDTO[]): Promise<void> {
    await this.repository.bulkCreate(data)
  }
}
export { RedeemsRepository }