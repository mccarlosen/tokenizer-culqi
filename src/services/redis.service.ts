import { createClient, RedisClientType } from 'redis'
export class RedisService {
  private static readonly instance: RedisService
  private readonly client: RedisClientType

  constructor () {
    this.client = createClient()
  }

  async connect (): Promise<RedisClientType> {
    return await this.client.connect()
  }

  getClient (): RedisClientType {
    return this.client
  }
}
