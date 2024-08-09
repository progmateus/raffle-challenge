interface ICardDTO {
  number: string,
  holder_name: string,
  exp_month: number,
  exp_year: number,
  cvv: string,
  billing_address: {
    line_1: string,
    zip_code: string,
    city: string,
    state: string,
    country: string
  }
}

export { ICardDTO }