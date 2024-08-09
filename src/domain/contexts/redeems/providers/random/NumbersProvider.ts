import { hash, compare } from 'bcryptjs'
import { INumbersProvider } from './INumbersProvider'

class NumbersProvider implements INumbersProvider {
  private MAX_NUMBER = 1000000;
  private MIN_NUMBER = 1;
  generateRandomNumbers(qtdNumbers: number): string[] {
    const numbers: string[] = [];
    for (let i = qtdNumbers; i > 0; i--) {
      const minCeiled = Math.ceil(this.MIN_NUMBER);
      const maxFloored = Math.floor(this.MAX_NUMBER);
      numbers.push(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled).toString())
    }
    return numbers;
  }
}

export { NumbersProvider }