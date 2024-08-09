
import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import dbConfig from "./config/config"
import { User } from "../domain/contexts/accounts/entities/User";
import { UsersTokens } from "../domain/contexts/auth/entities/UsersTokens";
import { Redeem } from "../domain/contexts/redeems/entites/Redeem";
import { Cart } from "../domain/contexts/orders/entities/Cart";
import { Order } from "../domain/contexts/orders/entities/Order";
import { Payment } from "../domain/contexts/payments/entites/Payment";

const dbOptions = <SequelizeOptions>dbConfig;
dbOptions.dialectModule = require("pg")

const sequelize = new Sequelize(dbOptions);

const models = [
  User,
  Redeem,
  UsersTokens,
  Cart,
  Order,
  Payment
];

sequelize.addModels(models);

export default sequelize;
