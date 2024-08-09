import { AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Redeem } from "../../redeems/entites/Redeem";
import { User } from "../../accounts/entities/User";

@Table
class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Redeem)
  redeem: Redeem;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export { Cart }