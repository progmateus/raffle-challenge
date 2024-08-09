import { CreateOrderUseCase } from "../../../../domain/contexts/orders/useCases/CreateOrderUseCase";
import { NumbersProvider } from "../../../../domain/contexts/redeems/providers/random/NumbersProvider";
import { CartsRepositoryInMemory } from "../repositories/CartsRepositoryInMemory";
import { OrdersRepositoryInMemory } from "../repositories/OrdersRepositoryInMemory";
import { PaymentsRepositoryInMemory } from "../repositories/PaymentsRepositoryInMemory";
import { RedeemsRepositoryInMemory } from "../../redeems/repositories/RedeemsRepositoryInMemory";

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let redeemsRepositoryInMemory: RedeemsRepositoryInMemory;
let cartsRepositoryInMemory: CartsRepositoryInMemory;
let paymentsRepositoryInMemory: PaymentsRepositoryInMemory;

let createOrderUseCase: CreateOrderUseCase;
let numbersProvider: NumbersProvider

describe("Create Order", () => {

  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    redeemsRepositoryInMemory = new RedeemsRepositoryInMemory()
    numbersProvider = new NumbersProvider()
    cartsRepositoryInMemory = new CartsRepositoryInMemory()
    paymentsRepositoryInMemory = new PaymentsRepositoryInMemory()

    createOrderUseCase = new CreateOrderUseCase(
      redeemsRepositoryInMemory,
      numbersProvider,
      cartsRepositoryInMemory,
      paymentsRepositoryInMemory,
      ordersRepositoryInMemory
    );

  })

  it("It should be able to create a new Order", async () => {
    const qtdNumbers = 4
    const userId = 1
    const price = qtdNumbers * 0.25

    const cart = await cartsRepositoryInMemory.create(userId)
    const order = await ordersRepositoryInMemory.create({ cartId: cart.id, price })

    const redeemCreated = await createOrderUseCase.execute({
      qtdNumbers: 4,
      userId: 1,
      payment: {
        orderId: order.id,
        payment_method: "credit_card",
        credit_card: {
          recurrence: false,
          installments: 1,
          statement_descriptor: "AVENGERS",
          card: {
            number: "4000000000000010",
            holder_name: "Tony Stark",
            exp_month: 1,
            exp_year: 30,
            cvv: "3531",
            billing_address: {
              line_1: "10880, Malibu Point, Malibu Central",
              zip_code: "90265",
              city: "Malibu",
              state: "CA",
              country: "US"
            }
          },
        }
      }
    })
    expect(redeemCreated).toHaveLength(4);
  })
})