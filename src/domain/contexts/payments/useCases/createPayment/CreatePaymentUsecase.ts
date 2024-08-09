import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../../dtos/ICreatePaymentDTO";
import { Payment } from "../../entites/Payment";
import { IPaymentsRepository } from "../../repositories/contracts/IPaymentsRepository";

@injectable()
class CreatePaymentUsecase {
  constructor(
    @inject("PaymentsRepository")
    private PaymentsRepository: IPaymentsRepository,
  ) { }

  async execute({ payment_method, credit_card }: ICreatePaymentDTO): Promise<Payment> {

    return await this.PaymentsRepository.create({
      credit_card,
      payment_method
    })
  }
}
export { CreatePaymentUsecase }