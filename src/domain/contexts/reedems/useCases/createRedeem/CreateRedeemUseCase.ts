
import { inject, injectable } from "tsyringe";
import { IRedeemsRepository } from "../../repositories/contracts/IRedeemsRepository";
import { ICreateRedeemDTO } from "../../dtos/ICreateReedemDTO";
import { INumbersProvider } from "../../providers/random/INumbersProvider";
import { Redeem } from "../../entites/Redeem";

@injectable()
class CreateRedeemUseCase {

  constructor(
    @inject("RedeemsRepository")
    private redeemsRepository: IRedeemsRepository,
    @inject("NumbersProvider")
    private numbersProvider: INumbersProvider
  ) { }

  async execute({ userId, qtdNumbers }: ICreateRedeemDTO): Promise<Redeem[]> {
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

    await this.redeemsRepository.bulkCreate(
      generatedNumbers.map((n) => {
        return {
          userId,
          number: n
        }
      })
    )
    return this.redeemsRepository.findByNumbers(generatedNumbers)
  }
}
export { CreateRedeemUseCase }