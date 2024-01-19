import TokenizerConfig from "../config/tokenizer.config";
import { CardInterface } from "../interfaces/card.interface";
import { CardRepositoryInterface } from "../interfaces/card.repository.interface";
import CardModel from "../models/card.model";

export class CardRepository implements CardRepositoryInterface {

	constructor(private cardModel: CardModel) {}
	async save(card: CardInterface): Promise<CardInterface> {
		const { cardNumber, cvv, expirationMonth, expirationYear, email, token } = card
		const cardData = { cardNumber, cvv, expirationMonth, expirationYear, email, token }	
		let cardEntity = await this.cardModel.save(cardData)
		return cardEntity
	}

	async getInfo(token: string): Promise<CardInterface | null> {
		let cardEntity = await this.cardModel.find(token)
		return cardEntity
	}

}