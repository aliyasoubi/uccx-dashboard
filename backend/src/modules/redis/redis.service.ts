import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);
  private memoryStore: Map<string, any> = new Map();
  private subscribers: Map<string, Array<(message: any) => void>> = new Map();

  async set(key: string, value: any, ttl?: number): Promise<void> {
    this.memoryStore.set(key, value);
    this.logger.debug(`Stored value for key: ${key}`);
  }

  async get(key: string): Promise<any> {
    return this.memoryStore.get(key);
  }

  async publish(channel: string, message: any): Promise<void> {
    const subscribers = this.subscribers.get(channel) || [];
    subscribers.forEach(callback => callback(message));
    this.logger.debug(`Published message to channel: ${channel}`);
  }

  subscribe(channel: string, callback: (message: any) => void): void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, []);
    }
    this.subscribers.get(channel)?.push(callback);
    this.logger.debug(`Subscribed to channel: ${channel}`);
  }
} 