import { ICreateRedeemDTO } from "../../dtos/ICreateReedemDTO";
import { IGenerateReedemDTO } from "../../dtos/IGenerateReedemDTO";
import { Redeem } from "../../entites/Redeem";

interface IRedeemsRepository {
  create(data: ICreateRedeemDTO): Promise<Redeem>;
  findByNumbers(numbers: string[]): Promise<Redeem[]>
  bulkCreate(data: IGenerateReedemDTO[]): Promise<void>;
}

export { IRedeemsRepository }