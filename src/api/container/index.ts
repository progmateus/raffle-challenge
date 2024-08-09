import { container } from "tsyringe";
import { IUsersTokensRepository } from "../../domain/contexts/auth/repositories/contracts/IUsersTokensRepository";
import { UsersTokensRepository } from "../../data/repositories/UsersTokensRepository";
import { IUsersRepository } from "../../domain/contexts/accounts/repositories/contracts/IUsersRepository";
import { UsersRepository } from "../../data/repositories/UserRepository";
import { IBcryptHasherProvider } from "../../domain/contexts/accounts/providers/criptography/IBcryptHasherProvider";
import { BcryptHasherProvider } from "../../domain/contexts/accounts/providers/criptography/BcryptHasherProvider";
import { IOrdersRepository } from "../../domain/contexts/orders/repositories/contracts/IOrdersRepository";
import { IPaymentsRepository } from "../../domain/contexts/payments/repositories/contracts/IPaymentsRepository";
import { OrdersRepository } from "../../data/repositories/OrdersRepository";
import { PaymentsRepository } from "../../data/repositories/PaymentsRepository";
import { IRedeemsRepository } from "../../domain/contexts/redeems/repositories/contracts/IRedeemsRepository";
import { RedeemsRepository } from "../../data/repositories/RedeemsRepository";
import { INumbersProvider } from "../../domain/contexts/redeems/providers/random/INumbersProvider";
import { NumbersProvider } from "../../domain/contexts/redeems/providers/random/NumbersProvider";
import { ICartsRepository } from "../../domain/contexts/orders/repositories/contracts/ICartsRepository";
import { CartsRepository } from "../../data/repositories/CartsRepository";

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IBcryptHasherProvider>(
  "BcryptHasherProvider",
  BcryptHasherProvider
);


container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);


container.registerSingleton<IPaymentsRepository>(
  "PaymentsRepository",
  PaymentsRepository
);

container.registerSingleton<IRedeemsRepository>(
  "RedeemsRepository",
  RedeemsRepository
);

container.registerSingleton<INumbersProvider>(
  "NumbersProvider",
  NumbersProvider
);

container.registerSingleton<ICartsRepository>(
  "CartsRepository",
  CartsRepository
);