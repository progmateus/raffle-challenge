import { ICreatePaymentDTO } from "../../payments/dtos/ICreatePaymentDTO";

interface ICreateOrderDTO {
  userId: number;
  qtdNumbers: number;
  payment: ICreatePaymentDTO,
  cartId: number;
  price: number;
}
export { ICreateOrderDTO }