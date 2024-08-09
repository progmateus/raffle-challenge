import { NumbersProvider } from "../../../../domain/contexts/reedems/providers/random/NumbersProvider";
import { CreateRedeemUseCase } from "../../../../domain/contexts/reedems/useCases/CreateRedeemUseCase";
import { RedeemsrepositoryInMemory } from "../repositories/IRedeemsrepositoryInMemody";

let redeemsRepositoryInMemory: RedeemsrepositoryInMemory;
let createRedeemUseCase: CreateRedeemUseCase;
let numbersProvider: NumbersProvider

describe("Create User", () => {

  beforeEach(() => {
    redeemsRepositoryInMemory = new RedeemsrepositoryInMemory();
    numbersProvider = new NumbersProvider()
    createRedeemUseCase = new CreateRedeemUseCase(
      redeemsRepositoryInMemory,
      numbersProvider
    );

  })

  it("It should be able to create a new redeem", async () => {
    const redeem = {
      userId: 1,
      qtdNumbers: 4
    }

    const redeemCreated = await createRedeemUseCase.execute({
      userId: redeem.userId,
      qtdNumbers: redeem.qtdNumbers,
    })
    expect(redeemCreated).toHaveLength(4);
  })
})