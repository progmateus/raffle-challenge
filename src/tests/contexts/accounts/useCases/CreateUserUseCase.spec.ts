import { UsersRepositoryInMemory } from "../repositories/UsersRepositoryInMemory";
import { BcryptHasherProvider } from "../../../../domain/contexts/accounts/providers/criptography/BcryptHasherProvider";
import { CreateUserUseCase } from "../../../../domain/contexts/accounts/useCases/createUser/CreateUserUseCase";

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

  it("It should be able to create a new User", async () => {
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
})