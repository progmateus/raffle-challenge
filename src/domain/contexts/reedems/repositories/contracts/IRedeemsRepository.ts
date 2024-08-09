import { IGenerateReedemDTO } from "../../dtos/IGenerateReedemDTO";
import { Redeem } from "../../entites/Redeem";

interface IRedeemsRepository {
  findByNumbers(numbers: string[]): Promise<Redeem[]>
  bulkCreate(data: IGenerateReedemDTO[]): Promise<void>;
}

export { IRedeemsRepository }