import { RedisService } from '../services/redis.service'
import { CardModelInterface } from '../interfaces/card.model.interface'
import { CardInterface } from '../interfaces/card.interface'
import TokenizerConfig from '../config/tokenizer.config'

class CardModel implements CardModelInterface {
  constructor (private readonly redisService: RedisService) {
    this.connect()
      .then(() => {})
      .catch((e) => { throw new Error(e.message) })
  }

  async connect (): Promise<void> {
    await this.redisService.connect()
  }

  async save (card: CardInterface): Promise<CardInterface> {
    const cardEntityId = `token:${card.token}`
    await this.redisService.getClient().hSet(cardEntityId, {
      cardNumber: card.cardNumber,
      cvv: card.cvv ?? 0,
      expirationMonth: card.expirationMonth,
      expirationYear: card.expirationYear,
      email: card.email,
      token: card.token
    })
    await this.redisService.getClient().expire(cardEntityId, TokenizerConfig.TOKENIZER_EXPIRATION_TOKEN)
    await this.redisService.getClient().quit()
    return card
  }

  async find (id: string): Promise<CardInterface | null> {
    const cardData = await this.redisService.getClient().hGetAll(`token:${id}`)
    if (Object.entries(cardData).length === 0) {
      return null
    }
    const card: CardInterface = {
      cardNumber: Number(cardData.cardNumber),
      expirationMonth: cardData.expirationMonth,
      expirationYear: cardData.expirationYear,
      email: cardData.email,
      token: cardData.token
    }
    await this.redisService.getClient().quit()

    return card
  }
}
export default CardModel
