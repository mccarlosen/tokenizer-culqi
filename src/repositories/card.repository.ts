import { CardInterface } from '../interfaces/card.interface'
import { CardModelInterface } from '../interfaces/card.model.interface'
import { CardRepositoryInterface } from '../interfaces/card.repository.interface'

export class CardRepository implements CardRepositoryInterface {
  constructor (private readonly cardModel: CardModelInterface) {}
  async save (card: CardInterface): Promise<CardInterface> {
    const { cardNumber, cvv, expirationMonth, expirationYear, email, token } = card
    const cardData = { cardNumber, cvv, expirationMonth, expirationYear, email, token }
    const cardEntity = await this.cardModel.save(cardData)
    return cardEntity
  }

  async getInfo (token: string | undefined): Promise<CardInterface | null> {
    const cardEntity = await this.cardModel.find(token)
    return cardEntity
  }
}
