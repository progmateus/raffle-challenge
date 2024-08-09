import { UsersRepositoryInMemory } from "../repositories/UsersRepositoryInMemory";
import { BcryptHasherProvider } from "../../../../domain/contexts/accounts/providers/criptography/BcryptHasherProvider";
import { CreateUserUseCase } from "../../../../domain/contexts/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let bcryptHasherProvider: BcryptHasherProvider

describe("Create User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    bcryptHasherProvider = new BcryptHasherProvider();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      bcryptHasherProvider
    )
  })

  it("It should be able to create a new user", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456"
    }

    const userCreated = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    })

    expect(userCreated).toHaveProperty("id");
  })

  it("It should not be able to create a new user with same email", async () => {
    let thrownError;
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456"
    }

    try {
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      })

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password
      })
    }
    catch (error) {
      thrownError = error;
    }

    expect(thrownError).rejects.toBeInstanceOf(AppError)
  })
})