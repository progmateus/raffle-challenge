import { Cart } from "../../../../domain/contexts/orders/entities/Cart";
import { ICartsRepository } from "../../../../domain/contexts/orders/repositories/contracts/ICartsRepository";
import { ICreatePaymentDTO } from "../../../../domain/contexts/payments/dtos/ICreatePaymentDTO";
import { Payment } from "../../../../domain/contexts/payments/entites/Payment";
import { IPaymentsRepository } from "../../../../domain/contexts/payments/repositories/contracts/IPaymentsRepository";

class PaymentsRepositoryInMemory implements IPaymentsRepository {
  payments: Payment[] = [];

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
    const payment = {
      id: 1,
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
    } as Payment;

    this.payments.push(payment)
    return payment;
  }
}
export { PaymentsRepositoryInMemory };