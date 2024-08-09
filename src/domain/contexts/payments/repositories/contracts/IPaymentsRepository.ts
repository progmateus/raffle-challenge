import { ICreatePaymentDTO } from "../../dtos/ICreatePaymentDTO";
import { Payment } from "../../entites/Payment";

interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>
}
export { IPaymentsRepository }