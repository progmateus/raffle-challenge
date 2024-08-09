
import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import dbConfig from "./config/config"
import { User } from "../domain/contexts/accounts/entities/User";
import { Redeem } from "../domain/contexts/reedems/entites/Redeem";
import { UsersTokens } from "../domain/contexts/auth/entities/UsersTokens";

const dbOptions = <SequelizeOptions>dbConfig;
dbOptions.dialectModule = require("pg")

const sequelize = new Sequelize(dbOptions);

const models = [
  User,
  Redeem,
  UsersTokens
];

sequelize.addModels(models);

export default sequelize;
