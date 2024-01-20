import createEvent from '@serverless/event-mocks'
import { APIGatewayProxyEvent } from 'aws-lambda'
export const useApiGatewayMock = (body: string, headers?: {}, pathParameters?: {}): APIGatewayProxyEvent => {
  const event = createEvent(
    'aws:apiGateway',
    {
      body,
      headers: headers ?? {},
      multiValueHeaders: {},
      httpMethod: '',
      isBase64Encoded: false,
      path: '',
      pathParameters: pathParameters ?? {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: '',
        apiId: '',
        authorizer: undefined,
        protocol: '',
        httpMethod: '',
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: '',
          user: null,
          userAgent: null,
          userArn: null
        },
        path: '',
        stage: '',
        requestId: '',
        requestTimeEpoch: 0,
        resourceId: '',
        resourcePath: ''
      },
      resource: ''
    }
  )
  return event
}
