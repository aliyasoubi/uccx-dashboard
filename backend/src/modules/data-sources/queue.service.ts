import { Injectable, Logger } from '@nestjs/common';
import { QueueData, VoiceIAQStats } from '../../common/interfaces';
import { UccxService } from '../uccx/uccx.service';

@Injectable()
export class QueueService {
  private logger = new Logger(QueueService.name);
  private queueData: Map<string, QueueData> = new Map();

  constructor(private readonly uccxService: UccxService) {
    this.initializeData();
  }

  private async initializeData() {
    try {
      const queues = await this.uccxService.getQueueStats();
      queues.forEach(queue => this.queueData.set(queue.id, queue));
      this.logger.log('Initialized queue data from UCCX');
    } catch (error) {
      this.logger.error('Failed to initialize queue data:', error);
      // Fallback to mock data if UCCX is unavailable
      this.initializeMockData();
    }
  }

  private initializeMockData() {
    const queues: QueueData[] = [
      {
        id: 'Moshtarian_CSQ',
        operation: 'UPDATE',
        VoiceIAQStats: {
          id: 1,
          esdId: 1,
          esdName: 'Moshtarian_CSQ',
          nResourcesLoggedIn: 5,
          nTotalContacts: 27,
          nHandledContacts: 24,
          nAbandonedContacts: 0,
          longestTalkDuration: 382942,
          longestWaitDuration: 25541,
          longestCurrentlyWaitingCallStartTime: 0,
          nAvailResources: 2,
          nInSessionResources: 0,
          nUnavailResources: 3,
          nWorkResources: 0,
          nSelectedResources: 0,
          nAgentsAdded: 0,
          nAgentsRemoved: 0,
          nWaitingContacts: 0,
          nAverageHandlingTimeLowThreshold: 179493.0,
          nAverageWaitingTimeLowThreshold: 2692.0,
          nAverageWaitingTimeHighThreshold: 9071.75,
          nAbandonedCallsLowThreshold: 0,
          nAbandonedCallsHighThreshold: 0,
          nDequeuedCallsLowThreshold: 0,
          nDequeuedCallsHighThreshold: 0,
          nSLAPercentageLowThreshold: 100.0,
          nAverageHandlingTimeHighThreshold: 470495.8,
          nSLAPercentageHighThreshold: 100.0
        }
      }
    ];

    queues.forEach(queue => this.queueData.set(queue.id, queue));
    this.logger.warn('Using mock queue data');
  }

  async getQueueData(queueId: string): Promise<QueueData | undefined> {
    try {
      // Try to get fresh data from UCCX
      const queues = await this.uccxService.getQueueStats();
      const queue = queues.find(q => q.id === queueId);
      if (queue) {
        this.queueData.set(queueId, queue);
        return queue;
      }
    } catch (error) {
      this.logger.error('Failed to fetch queue data from UCCX:', error);
    }
    // Fallback to cached data
    return this.queueData.get(queueId);
  }

  async getAllQueues(): Promise<QueueData[]> {
    try {
      // Try to get fresh data from UCCX
      const queues = await this.uccxService.getQueueStats();
      queues.forEach(queue => this.queueData.set(queue.id, queue));
      return queues;
    } catch (error) {
      this.logger.error('Failed to fetch queues from UCCX:', error);
      // Fallback to cached data
      return Array.from(this.queueData.values());
    }
  }

  async getHistoricalData(
    queueId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<QueueData[]> {
    // In a real implementation, this would query historical data from UCCX
    const queue = this.queueData.get(queueId);
    return queue ? [queue] : [];
  }

  updateQueueStats(queueId: string, stats: Partial<VoiceIAQStats>): void {
    const queue = this.queueData.get(queueId);
    if (queue) {
      queue.VoiceIAQStats = { ...queue.VoiceIAQStats, ...stats };
      this.queueData.set(queueId, queue);
      this.logger.debug(`Updated queue ${queueId} stats`);
    }
  }
} 