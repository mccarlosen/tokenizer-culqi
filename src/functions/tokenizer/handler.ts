import { useHeaderValidate } from '../../libs/use-headers.lib'
import { useValidate } from '../../libs/use-validator.lib'
import { useResponseJson } from '../../libs/use-response-json.lib'
import { CardRepository } from '../../repositories/card.repository'
import { Card } from '../../entities/card'
import { useCreateToken } from '../../libs/use-create-token.lib'
import { RedisService } from '../../services/redis.service'
import CardModel from '../../models/card.model'
import { useCardTokenValidate } from '../../libs/use-card-token-validate.lib'
import { useAuthorizationTokenValidate } from '../../libs/use-authorization-token-validate.lib'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const tokenizerCreateTokenHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { headers } = event

  if (useHeaderValidate(headers, 'Authorization') === null || useHeaderValidate(headers, 'Authorization') === undefined) {
    return useResponseJson({ error: 'Bad Request.', message: 'Authorization header is missing.' }, 400)
  }
  if (useAuthorizationTokenValidate().check(headers.authorization) == null) {
    return useResponseJson({ error: 'Unauthorized.', message: 'Authorization token is invalid.' }, 401)
  }
  const contentType = useHeaderValidate(headers, 'Content-Type')
  if (contentType === null || contentType === undefined) {
    return useResponseJson({ error: 'Bad Request.', message: 'Content-Type header is missing.' }, 400)
  }
  if (contentType !== 'application/json') {
    return useResponseJson({ error: 'Bad Request.', message: 'The Content-Type must be set to application/json.' }, 400)
  }

  try {
    const data = JSON.parse(event.body ?? '')
    const rules = {
      cardNumber: 'required|numeric|min:13|max:16|luhnFormat',
      cvv: 'required|numeric|min:3|max:4',
      expirationMonth: 'required|string|min:1|max:2',
      expirationYear: 'required|string|min:4|max:4',
      email: 'required|string|min:5|max:100'
    }
    useValidate(data, rules)
    const { cardNumber, cvv, expirationMonth, expirationYear, email } = data
    const token = useCreateToken(16)
    const cardEntity = new Card()
    cardEntity.cardNumber = cardNumber
    cardEntity.cvv = cvv
    cardEntity.expirationMonth = expirationMonth
    cardEntity.expirationYear = expirationYear
    cardEntity.email = email
    cardEntity.token = token
    const cardModel = new CardModel(new RedisService())
    const cardRepository = new CardRepository(cardModel)
    await cardRepository.save(cardEntity)
    return useResponseJson({ token, message: 'The token has been created successful' }, 200)
  } catch (e) {
    return useResponseJson({ error: 'Unprocessable Content', message: e.message }, 422)
  }
}

export const tokenizerGetCardDataHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { headers, pathParameters } = event

  if (useHeaderValidate(headers, 'Authorization') == null || useHeaderValidate(headers, 'Authorization') === undefined) {
    return useResponseJson({ error: 'Bad Request.', message: 'Authorization header is missing.' }, 400)
  }
  if (!useAuthorizationTokenValidate().check(headers.authorization)) {
    return useResponseJson({ error: 'Unauthorized.', message: 'Authorization token is invalid.' }, 401)
  }
  if (pathParameters !== null) {
    const { token } = pathParameters
    if (!useCardTokenValidate().isValid(token)) {
      return useResponseJson({ error: 'Bad Request.', message: 'The token param is invalid.' }, 400)
    }
    const cardModel = new CardModel(new RedisService())
    const cardRepository = new CardRepository(cardModel)
    const cardEntity = await cardRepository.getInfo(token)
    if (cardEntity != null) {
      return useResponseJson({ info: cardEntity }, 200)
    }
    return useResponseJson({ info: cardEntity, message: 'The card token has expired or not exist.' }, 200)
  }
  return useResponseJson({ error: 'Bad Request.', message: 'The token param is missing.' }, 200)
}
