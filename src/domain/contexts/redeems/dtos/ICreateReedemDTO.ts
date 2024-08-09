import { ICreatePaymentDTO } from "../../payments/dtos/ICreatePaymentDTO";

interface ICreateRedeemDTO {
  userId: number;
  qtdNumbers: number;
  payment: ICreatePaymentDTO,
}
export { ICreateRedeemDTO }