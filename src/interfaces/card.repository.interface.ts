import { CardInterface } from './card.interface'

export interface CardRepositoryInterface {
  save: (card: CardInterface) => Promise<CardInterface>
  getInfo: (token: string | undefined) => Promise<CardInterface | null>
}
