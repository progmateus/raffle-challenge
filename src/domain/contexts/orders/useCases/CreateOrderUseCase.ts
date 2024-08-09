
import { container, inject, injectable } from "tsyringe";
import { ICartsRepository } from "../repositories/contracts/ICartsRepository";
import { IOrdersRepository } from "../repositories/contracts/IOrdersRepository";
import { CreatePaymentUsecase } from "../../payments/useCases/createPayment/CreatePaymentUsecase";
import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { IRedeemsRepository } from "../../redeems/repositories/contracts/IRedeemsRepository";
import { INumbersProvider } from "../../redeems/providers/random/INumbersProvider";
import { Redeem } from "../../redeems/entites/Redeem";
import { IPaymentsRepository } from "../../payments/repositories/contracts/IPaymentsRepository";
import { z } from "zod";


const orderSchema = z.object({
  qtdNumbers: z.number().positive(),
  payment: z.object({
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
  })
});
@injectable()
class CreateOrderUseCase {

  constructor(
    @inject("RedeemsRepository")
    private redeemsRepository: IRedeemsRepository,
    @inject("NumbersProvider")
    private numbersProvider: INumbersProvider,
    @inject("CartsRepository")
    private cartsRepository: ICartsRepository,
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
  ) { }

  async execute({ payment, qtdNumbers, userId }: Omit<ICreateOrderDTO, "cartId" | "price">): Promise<Redeem[]> {

    orderSchema.parse({ qtdNumbers, payment })

    let generatedNumbers = this.numbersProvider.generateRandomNumbers(qtdNumbers);

    const numbersAlreadyExistents = await this.redeemsRepository.findByNumbers(generatedNumbers)

    if (numbersAlreadyExistents.length > 0) {
      let alreadyExists = true;
      let existentNumbers = numbersAlreadyExistents;
      let nonExistentNumbers = generatedNumbers.filter(element => numbersAlreadyExistents.find((r) => r.number !== element))
      while (alreadyExists) {
        const newNumbers = this.numbersProvider.generateRandomNumbers(existentNumbers.length);
        existentNumbers = await this.redeemsRepository.findByNumbers(newNumbers)
        nonExistentNumbers = [...nonExistentNumbers, ...newNumbers.filter(element => numbersAlreadyExistents.find((r) => r.number !== element))]
        if (existentNumbers.length === 0) {
          alreadyExists = false
        }
      }
      generatedNumbers = nonExistentNumbers
    }
    const price = qtdNumbers * 0.25;

    const { id: cartId } = await this.cartsRepository.create(userId);

    const order = await this.ordersRepository.create({
      qtdNumbers,
      cartId,
      userId,
      price
    })

    const { credit_card, payment_method } = payment

    const createPaymentUseCase = new CreatePaymentUsecase(this.paymentsRepository, this.ordersRepository);

    await createPaymentUseCase.execute({ payment_method, credit_card, orderId: order.id })

    await this.redeemsRepository.bulkCreate(
      generatedNumbers.map((n) => {
        return {
          userId,
          number: n,
          cartId
        }
      })
    )
    return this.redeemsRepository.findByNumbers(generatedNumbers)
  }
}
export { CreateOrderUseCase }