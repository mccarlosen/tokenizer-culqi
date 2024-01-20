
import { useApiGatewayMock } from '../__mocks__/apigateway-mock'
import { tokenizerCreateTokenHandler, tokenizerGetCardDataHandler } from '../functions/tokenizer/handler'

describe('Creación de un token', () => {
  test('Mostrar el mensaje "Authorization header is missing." si no se envía el token de autorización.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: '41111111111111111',
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com',
        token: '32lX9aWRoFWPM6ke'
      }),
      {
        // authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
        // 'content-type': 'appication/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(result).toEqual({ statusCode: 400, body: '{"error":"Bad Request.","message":"Authorization header is missing."}' })
  })

  test('Mostrar el mensaje "Authorization token is invalid." si el token de autorización no es válido.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'),
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        // formato pk_test_LsRBKejzCOEEWOsw{16}
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOswXYZ' // Se agregaron 3 caracteres más (XYZ)
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(result).toEqual({ statusCode: 401, body: '{"error":"Unauthorized.","message":"Authorization token is invalid."}' })
  })

  test('Mostrar el mensaje "c headet is missing." si el Content-Type no está presente en la solicitud.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'),
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' // valid
        // 'content-type': 'appication/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(result).toEqual({ statusCode: 400, body: '{"error":"Bad Request.","message":"Content-Type header is missing."}' })
  })

  test('Mostrar el mensaje "The Content-Type must be set to application/json." si el Content-Type esperado no es application/json.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'),
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'text/html'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(result).toEqual({ statusCode: 400, body: '{"error":"Bad Request.","message":"The Content-Type must be set to application/json."}' })
  })

  test('El campo "cardNumber" de ser numérico.', async () => {
    const eventForIsNumeric = useApiGatewayMock(
      JSON.stringify({
        cardNumber: '4111111111111111', // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const resultForIsNumeric = await tokenizerCreateTokenHandler(eventForIsNumeric)
    expect(JSON.parse(resultForIsNumeric.body).message).toBe('cardNumber does not meet the rule: numeric')
  })

  test('El campo "cardNumber" de ser de una longitud entre 13 y 16 caracteres.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('411111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('cardNumber does not meet the rule: min:13')
  })

  test('El campo "cardNumber" debe cumplir con la suma de verificación LUHN.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111100'), // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('cardNumber does not meet the rule: luhnFormat')
  })

  test('El campo "CVV" de ser numérico.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: '123',
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('cvv does not meet the rule: numeric')
  })

  test('El campo "CVV" de ser de una longitud máx de 4 caracteres.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 12355,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('cvv does not meet the rule: max:4')
  })

  test('El campo "CVV" de ser de una longitud min 3 caracteres.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 12,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('cvv does not meet the rule: min:3')
  })

  test('El campo "expirationMonth" de ser una cadena caracteres.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: 9,
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('expirationMonth does not meet the rule: string')
  })

  test('El campo "expirationMonth" de ser una longitud máx de 2 caracter.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: '029',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('expirationMonth does not meet the rule: max:2')
  })

  test('El campo "expirationYear" de ser mayor o igual al año actual y menor a 6 años.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2029',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('expirationYear does not meet the rule: validityYear:5')
  })

  test('El campo "email" de tener un formato válido de correo electrónico.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en @gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('email does not meet the rule: emailFormat')
  })

  test('El campo "email" sólo soporta direcciones de los proveedores de: gmail.com, hotmail.com, yahoo.es.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@developer.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('email does not meet the rule: emailDomainSupport:gmail.com:hotmail.com:yahoo.es')
  })

  test('Mostrar el mensaje "The token has been created successful" cuando el token se genera correctamente.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('4111111111111111'), // 4111111111111111
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result = await tokenizerCreateTokenHandler(event)
    expect(JSON.parse(result.body).message).toBe('The token has been created successful')
  })
})

describe('Obtener datos de tarjeta', () => {
  test('Mostrar el mensaje "The token param is invalid." cuando el token no cumple con el formato exigido.', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({}),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      },
      {
        token: 'abcdefg12345678911'
      }
    )
    const result = await tokenizerGetCardDataHandler(event)
    expect(JSON.parse(result.body).message).toBe('The token param is invalid.')
  })

  test('Generar un token y obtener los datos de la tarjeta.', async () => {
    // primero generamos un token
    const event1 = useApiGatewayMock(
      JSON.stringify({
        cardNumber: Number('341111111111111'),
        cvv: 123,
        expirationMonth: '09',
        expirationYear: '2025',
        email: 'mccarlos.en@gmail.com'
      }),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      }
    )
    const result1 = await tokenizerCreateTokenHandler(event1)
    expect(JSON.parse(result1.body).message).toBe('The token has been created successful')
    const tokenData = JSON.parse(result1.body).token
    const event2 = useApiGatewayMock(
      JSON.stringify({}),
      {
        authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw', // valid
        'content-type': 'application/json'
      },
      {
        token: tokenData
      }
    )
    const result2 = await tokenizerGetCardDataHandler(event2)
    expect(result2.body).toEqual('{"info":{"cardNumber":341111111111111,"expirationMonth":"09","expirationYear":"2025","email":"mccarlos.en@gmail.com","token":"' + String(tokenData) + '"}}')
  })
})
