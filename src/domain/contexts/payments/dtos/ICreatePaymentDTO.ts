import { ICardDTO } from "./ICreditCardDTO"

interface ICreatePaymentDTO {
  payment_method: string,
  orderId: number,
  credit_card: {
    recurrence: boolean,
    installments: number,
    statement_descriptor: string,
    card: ICardDTO
  }
}

export { ICreatePaymentDTO }