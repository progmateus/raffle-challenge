import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../../dtos/ICreatePaymentDTO";
import { Payment } from "../../entites/Payment";
import { IPaymentsRepository } from "../../repositories/contracts/IPaymentsRepository";
import { z } from "zod";
import { IOrdersRepository } from "../../../orders/repositories/contracts/IOrdersRepository";

const paymentSchema = z.object({
  payment_method: z.string(),
  credit_card: z.object({
    recurrence: z.boolean(),
    installments: z.number().positive(),
    statement_descriptor: z.string(),
    card: z.object({
      number: z.string().length(16),
      holder_name: z.string(),
      exp_month: z.number().positive(),
      exp_year: z.number().positive(),
      cvv: z.string().length(4),
      billing_address: z.object({
        line_1: z.string(),
        zip_code: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string()
      })
    })
  })
});
@injectable()
class CreatePaymentUsecase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) { }

  async execute({ payment_method, credit_card, orderId }: ICreatePaymentDTO): Promise<Payment> {

    paymentSchema.parse({ payment_method, credit_card })

    const payment = await this.paymentsRepository.create({
      credit_card,
      payment_method,
      orderId
    })

    this.ordersRepository.informPayment(orderId, payment.id)

    return payment
  }
}
export { CreatePaymentUsecase }