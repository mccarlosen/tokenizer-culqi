import { CardInterface } from '../interfaces/card.interface'

export class Card implements CardInterface {
  cardNumber: number
  cvv: number
  expirationMonth: string
  expirationYear: string
  email: string
  token: string
}
