import { container } from "tsyringe";
import { IUsersTokensRepository } from "../../domain/contexts/auth/repositories/contracts/IUsersTokensRepository";
import { UsersTokensRepository } from "../../data/repositories/UsersTokensRepository";
import { IUsersRepository } from "../../domain/contexts/accounts/repositories/contracts/IUsersRepository";
import { UsersRepository } from "../../data/repositories/UserRepository";

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);