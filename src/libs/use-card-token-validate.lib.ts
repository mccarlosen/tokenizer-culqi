import TokenizerConfig from "../config/tokenizer.config"

export const useCardTokenValidate = () => {
	const isValid = (token: string | number): boolean => {
		if (!(String(token).length == TokenizerConfig.TOKENIZER_TOKEN_LENGTH)) {
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