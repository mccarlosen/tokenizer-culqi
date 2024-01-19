interface AuthorizationTokenValidator {
  check: (tokenValue: string | undefined) => boolean
}
export const useAuthorizationTokenValidate = (): AuthorizationTokenValidator => {
  const check = (tokenValue: string | undefined): boolean => {
    if (tokenValue === null || tokenValue === undefined) {
      return false
    }
    const [, bearerToken] = tokenValue.split(' ')
    const regex = /^pk_test_[a-zA-Z0-9]{16}$/
    return regex.test(bearerToken)
  }

  return {
    check
  }
}
