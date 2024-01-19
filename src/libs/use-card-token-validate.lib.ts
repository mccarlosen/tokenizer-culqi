import TokenizerConfig from '../config/tokenizer.config'
interface CardTokenValidator {
  isValid: (token: string) => boolean
}

export const useCardTokenValidate = (): CardTokenValidator => {
  const isValid = (token: string): boolean => {
    if (!(String(token).length === TokenizerConfig.TOKENIZER_TOKEN_LENGTH)) {
      return false
    }
    if (!(/[a-zA-Z]/.test(String(token)) && /\d/.test(String(token)))) {
      return false
    }
    return true
  }

  return {
    isValid
  }
}
