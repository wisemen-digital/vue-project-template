import sign from 'jwt-encode'
import { http, HttpResponse } from 'msw'

interface Token {
  exp: number
}

function encodeJwt(token: Token): string {
  return sign(token, 'secret')
}

export const authHandlers = [
  http.post('*/oauth/v2/token', () => {
    return HttpResponse.json({
      access_token: 'access_token',
      expires_in: 43199,
      id_token: encodeJwt({ exp: new Date(new Date().getFullYear() + 1, 0, 1).getTime() }),
      refresh_token: 'refresh_token',
      token_type: 'Bearer',
    })
  }),

  http.get('*/oidc/v1/userinfo', () => {
    return HttpResponse.json({
      updated_at: 1733752214,
      name: 'John Doe',
      email: 'johndoe@test.com',
      email_verified: true,
      family_name: 'Doe',
      given_name: 'John',
      locale: null,
      preferred_username: 'John',
      sub: '297386579666667315',
    })
  }),
]
