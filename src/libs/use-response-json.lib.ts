import { APIGatewayProxyResult } from 'aws-lambda'

export const useResponseJson = (message: string | object, code: number): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: JSON.stringify(message)
  }
}
