
import { container, inject, injectable } from "tsyringe";
import { IRedeemsRepository } from "../repositories/contracts/IRedeemsRepository";
import { ICreateRedeemDTO } from "../dtos/ICreateReedemDTO";
import { INumbersProvider } from "../providers/random/INumbersProvider";
import { Redeem } from "../entites/Redeem";
import { ICartsRepository } from "../../orders/repositories/contracts/ICartsRepository";
import { IOrdersRepository } from "../../orders/repositories/contracts/IOrdersRepository";
import { CreatePaymentUsecase } from "../../payments/useCases/createPayment/CreatePaymentUsecase";

@injectable()
class CreateRedeemUseCase {

  constructor(
    @inject("RedeemsRepository")
    private redeemsRepository: IRedeemsRepository,
    @inject("NumbersProvider")
    private numbersProvider: INumbersProvider,
    @inject("CartsRepository")
    private cartsRepository: ICartsRepository,
    @inject("PaymentsRepository")
    private ordersRepository: IOrdersRepository,
  ) { }

  async execute({ userId, qtdNumbers, payment }: ICreateRedeemDTO): Promise<Redeem[]> {
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

    const { id: cartId } = await this.cartsRepository.create();

    const order = await this.ordersRepository.create({
      qtdNumbers,
      cartId,
      price: qtdNumbers * 0.25
    })

    const { credit_card, payment_method } = payment

    const createPaymentUseCase = container.resolve(CreatePaymentUsecase)

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
export { CreateRedeemUseCase }