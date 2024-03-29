import { CardInterface } from './card.interface'

export interface CardModelInterface {
  save: (card: CardInterface) => Promise<CardInterface>
  find: (id: string | undefined) => Promise<CardInterface | null>
}
