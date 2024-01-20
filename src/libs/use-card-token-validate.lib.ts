import TokenizerConfig from '../config/tokenizer.config'
interface CardTokenValidator {
  isValid: (token: string | undefined) => boolean
}

export const useCardTokenValidate = (): CardTokenValidator => {
  const isValid = (token: string | undefined): boolean => {
    if ((String(token).length !== TokenizerConfig.TOKENIZER_TOKEN_LENGTH)) {
      return false
    }
    if (!/[a-z]/.test(String(token)) || !/[A-Z]/.test(String(token)) || !/\d/.test(String(token))) {
      return false
    }
    return true
  }

  return {
    isValid
  }
}
