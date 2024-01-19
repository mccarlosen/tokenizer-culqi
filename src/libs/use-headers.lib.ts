import { APIGatewayProxyEventHeaders } from 'aws-lambda'

export const useHeaderValidate = (headers: APIGatewayProxyEventHeaders, matchHeader: string): string | undefined => {
  return headers[matchHeader.toLowerCase()]
}
