import { createClient, RedisClientType } from 'redis'
import * as dotenv from 'dotenv'

dotenv.config()

export class RedisService {
  private static readonly instance: RedisService
  private readonly client: RedisClientType

  constructor () {
    this.client = createClient({
      url: `redis://${String(process.env.REDIS_HOST)}:${String(process.env.REDIS_PORT)}`
    })
  }

  async connect (): Promise<RedisClientType> {
    return await this.client.connect()
  }

  getClient (): RedisClientType {
    return this.client
  }
}
