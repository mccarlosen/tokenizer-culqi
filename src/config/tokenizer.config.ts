const TokenizerConfig = {
  TOKENIZER_EXPIRATION_TOKEN: Number(process.env.TOKENIZER_EXPIRATION_TOKEN ?? 0),
  TOKENIZER_TOKEN_LENGTH: Number(process.env.TOKENIZER_TOKEN_LENGTH)
}

export default TokenizerConfig
