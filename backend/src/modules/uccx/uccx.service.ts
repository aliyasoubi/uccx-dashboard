import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { QueueData, OperatorData } from '../../common/interfaces';
import { UccxConfig } from '../../config/configuration';

@Injectable()
export class UccxService {
  private readonly logger = new Logger(UccxService.name);
  private readonly config: UccxConfig;
  private readonly axiosInstance: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get<UccxConfig>('uccx');
    
    this.axiosInstance = axios.create({
      baseURL: `${this.config.host}:${this.config.port}`,
      auth: {
        username: this.config.username,
        password: this.config.password,
      },
      timeout: 5000,
    });
  }

  private async retry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt < this.config.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        }
      }
    }
    
    throw lastError;
  }

  async getQueueStats(): Promise<QueueData[]> {
    return this.retry(async () => {
      try {
        const response = await this.axiosInstance.post(this.config.endpoints.queueStats);
        return response.data;
      } catch (error) {
        this.logger.error('Failed to fetch queue stats:', error);
        throw error;
      }
    });
  }

  async getAgentStats(): Promise<OperatorData[]> {
    return this.retry(async () => {
      try {
        const response = await this.axiosInstance.post(this.config.endpoints.agentStats);
        return response.data;
      } catch (error) {
        this.logger.error('Failed to fetch agent stats:', error);
        throw error;
      }
    });
  }
} 