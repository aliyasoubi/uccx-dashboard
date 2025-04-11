import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

interface OutboundData {
  id: string;
  status: 'active' | 'completed' | 'failed';
  metrics: {
    totalCalls: number;
    successfulCalls: number;
    failedCalls: number;
    averageCallDuration: number;
  };
}

@Injectable()
export class OutboundService {
  private logger = new Logger(OutboundService.name);
  private outboundData: Map<string, OutboundData> = new Map();

  constructor() {
    this.outboundData.set('campaign1', {
      id: 'campaign1',
      status: 'active',
      metrics: {
        totalCalls: 100,
        successfulCalls: 80,
        failedCalls: 20,
        averageCallDuration: 120,
      },
    });
  }

  async getOutboundData(campaignId: string): Promise<OutboundData | undefined> {
    return this.outboundData.get(campaignId);
  }

  async getHistoricalData(
    campaignId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<OutboundData[]> {
    return [
      {
        id: campaignId,
        status: 'active',
        metrics: {
          totalCalls: 120,
          successfulCalls: 95,
          failedCalls: 25,
          averageCallDuration: 130,
        },
      },
    ];
  }
} 