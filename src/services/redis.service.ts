import { createClient, RedisClientType } from "redis";
import RedisConfig from "../config/redis.config";
export class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
  }

  async connect(): Promise<RedisClientType> {
    return await this.client.connect()
  }

  getClient(): RedisClientType {
    return this.client;
  }
}
