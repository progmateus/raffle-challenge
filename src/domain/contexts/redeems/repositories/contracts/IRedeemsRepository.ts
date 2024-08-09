import { IGenerateRedeemDTO } from "../../dtos/IGenerateRedeemDTO";
import { Redeem } from "../../entites/Redeem";

interface IRedeemsRepository {
  findByNumbers(numbers: string[]): Promise<Redeem[]>
  bulkCreate(data: IGenerateRedeemDTO[]): Promise<void>;
}

export { IRedeemsRepository }