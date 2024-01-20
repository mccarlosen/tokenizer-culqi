import * as dotenv from 'dotenv'

dotenv.config()

const RedisConfig = {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
}

export default RedisConfig
