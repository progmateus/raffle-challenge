import { injectable } from "tsyringe";
import { Repository } from "sequelize-typescript";
import sequelize from "..";
import { IPaymentsRepository } from "../../domain/contexts/payments/repositories/contracts/IPaymentsRepository";
import { Payment } from "../../domain/contexts/payments/entites/Payment";
import { ICreatePaymentDTO } from "../../domain/contexts/payments/dtos/ICreatePaymentDTO";

@injectable()
class PaymentsRepository implements IPaymentsRepository {
  private repository: Repository<Payment>

  constructor() {
    this.repository = sequelize.getRepository(Payment)
  }
  async create({
    payment_method,
    credit_card: {
      card: {
        billing_address: {
          city,
          country,
          line_1,
          state,
          zip_code
        },
        holder_name,
        number
      },
      installments,
      recurrence,
      statement_descriptor
    },
    orderId
  }: ICreatePaymentDTO): Promise<Payment> {
    return await this.repository.create({
      method: payment_method,
      recurrence,
      installments,
      statementDescriptor: statement_descriptor,
      cardFinalNumbers: number.substring(number.length - 5, number.length + 1),
      cardHolderName: holder_name,
      line1: line_1,
      zipCode: zip_code,
      city,
      state,
      country,
      orderId
    })
  }

}
export { PaymentsRepository }