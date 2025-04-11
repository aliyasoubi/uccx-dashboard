import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class UccxService implements OnModuleInit {
  private logger = new Logger(UccxService.name);
  private readonly CACHE_TTL = 60; // 1 minute cache TTL
  private readonly POLLING_INTERVAL = 30000; // 30 seconds

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    // Start polling UCCX data
    this.startPolling();
  }

  private async startPolling() {
    setInterval(async () => {
      try {
        await this.fetchAndCacheUccxData();
      } catch (error) {
        this.logger.error('Error polling UCCX data:', error);
      }
    }, this.POLLING_INTERVAL);
  }

  private async fetchAndCacheUccxData() {
    try {
      // TODO: Implement actual UCCX API calls
      // This is a placeholder for the actual implementation
      const mockData = {
        timestamp: new Date().toISOString(),
        metrics: {
          activeCalls: Math.floor(Math.random() * 100),
          averageWaitTime: Math.floor(Math.random() * 300),
          queueSize: Math.floor(Math.random() * 50),
        },
      };

      // Cache the data
      await this.redisService.set('uccx:current', mockData, this.CACHE_TTL);

      // Publish update to Redis channel
      await this.redisService.publish('uccx-updates', mockData);

      this.logger.debug('UCCX data updated and cached');
    } catch (error) {
      this.logger.error('Error fetching UCCX data:', error);
      throw error;
    }
  }

  async getCurrentMetrics() {
    return this.redisService.get('uccx:current');
  }
} 