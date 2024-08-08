interface ICreateUserTokenDTO {
  userId: number;
  expiresDate: Date;
  refreshToken: string;
}
export { ICreateUserTokenDTO }