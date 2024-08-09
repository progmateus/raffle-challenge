import { AutoIncrement, BelongsTo, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table
class Payment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  method: string;

  @Column
  recurrence: boolean;

  @Column
  installments: number;

  @Column
  statementDescriptor: string;

  @Column
  cardFinalNumbers: string;

  @Column
  cardHolderName: string;

  @Column
  cardExpMonth: number;

  @Column
  cardExpYear: number;

  @Column
  cardCvv: string;

  @Column
  line1: string;

  @Column
  zipCode: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @BelongsTo(() => Payment)
  payment: Payment;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export { Payment }