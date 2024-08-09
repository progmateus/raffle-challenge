import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Payment } from "../../payments/entites/Payment";
import { Cart } from "./Cart";

@Table
class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Payment)
  @AllowNull
  @Column
  paymentId?: number;

  @BelongsTo(() => Payment)
  @AllowNull
  payment?: Payment;

  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @Column
  price: number;

  @Default(false)
  @Column
  isPayed: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export { Order }