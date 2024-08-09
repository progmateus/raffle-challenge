import { AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "../../accounts/entities/User";
import { Payment } from "../../payments/entites/Payment";

@Table
class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Payment)
  @Column
  paymentId: number;

  @BelongsTo(() => Payment)
  payment: Payment;

  @Column
  price: string;

  @Column
  isPayed: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export { Order }