import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../../dtos/ICreatePaymentDTO";
import { Payment } from "../../entites/Payment";
import { IPaymentsRepository } from "../../repositories/contracts/IPaymentsRepository";
import { z } from "zod";

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
      cvv: z.string().length(3),
      billing_address: z.object({
        line_1: z.string(),
        zip_code: z.string(),
        cit: z.string(),
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
    private PaymentsRepository: IPaymentsRepository,
  ) { }

  async execute({ payment_method, credit_card }: ICreatePaymentDTO): Promise<Payment> {

    paymentSchema.parse({ payment_method, credit_card })

    return await this.PaymentsRepository.create({
      credit_card,
      payment_method
    })
  }
}
export { CreatePaymentUsecase }