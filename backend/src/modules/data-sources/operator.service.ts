import { Injectable, Logger } from '@nestjs/common';
import { OperatorData, ResourceIAQStats } from '../../common/interfaces';
import { UccxService } from '../uccx/uccx.service';

@Injectable()
export class OperatorService {
  private logger = new Logger(OperatorService.name);
  private operatorData: Map<string, OperatorData> = new Map();

  constructor(private readonly uccxService: UccxService) {
    this.initializeData();
  }

  private async initializeData() {
    try {
      const operators = await this.uccxService.getAgentStats();
      operators.forEach(operator => this.operatorData.set(operator.id, operator));
      this.logger.log('Initialized operator data from UCCX');
    } catch (error) {
      this.logger.error('Failed to initialize operator data:', error);
      // Fallback to mock data if UCCX is unavailable
      this.initializeMockData();
    }
  }

  private initializeMockData() {
    const operators: OperatorData[] = [
      {
        id: 'operator1',
        operation: 'UPDATE',
        publishedTime: Date.now(),
        ResourceIAQStats: {
          resourceId: 'operator1',
          resourceName: 'Operator One',
          timeChangedStateMillis: Date.now(),
          nHandledContacts: 5,
          nPresentedContacts: 5,
          avgTalkDuration: 120000,
          longestTalkDuration: 300000,
          avgHoldDuration: 0,
          longestHoldDuration: 0,
          avgWorkDuration: 10000,
          totalTalkTime: 600000,
          totalHoldTime: 0,
          maxReadyTime: 300000,
          avgReadyTime: 150000,
          totalReadyTime: 750000,
          maxNotReadyTime: 0,
          avgNotReadyTime: 0,
          totalNotReadyTime: 0,
          maxWorkTime: 10000,
          totalWorkTime: 50000,
          logonDuration: 3600000,
          avgSpeedOfAnswer: 5000,
          rsrcCurrentStateReason: '',
          strResourceState: 'Ready',
          resourceBusySubState: ''
        }
      },
      {
        id: 'operator2',
        operation: 'UPDATE',
        publishedTime: Date.now(),
        ResourceIAQStats: {
          resourceId: 'operator2',
          resourceName: 'Operator Two',
          timeChangedStateMillis: Date.now(),
          nHandledContacts: 8,
          nPresentedContacts: 8,
          avgTalkDuration: 150000,
          longestTalkDuration: 350000,
          avgHoldDuration: 5000,
          longestHoldDuration: 10000,
          avgWorkDuration: 15000,
          totalTalkTime: 1200000,
          totalHoldTime: 40000,
          maxReadyTime: 400000,
          avgReadyTime: 200000,
          totalReadyTime: 1600000,
          maxNotReadyTime: 5000,
          avgNotReadyTime: 2000,
          totalNotReadyTime: 16000,
          maxWorkTime: 15000,
          totalWorkTime: 120000,
          logonDuration: 7200000,
          avgSpeedOfAnswer: 3000,
          rsrcCurrentStateReason: '',
          strResourceState: 'Ready',
          resourceBusySubState: ''
        }
      }
    ];

    operators.forEach(operator => this.operatorData.set(operator.id, operator));
    this.logger.warn('Using mock operator data');
  }

  async getOperatorData(operatorId: string): Promise<OperatorData | undefined> {
    try {
      // Try to get fresh data from UCCX
      const operators = await this.uccxService.getAgentStats();
      const operator = operators.find(op => op.id === operatorId);
      if (operator) {
        this.operatorData.set(operatorId, operator);
        return operator;
      }
    } catch (error) {
      this.logger.error('Failed to fetch operator data from UCCX:', error);
    }
    // Fallback to cached data
    return this.operatorData.get(operatorId);
  }

  async getAllOperators(): Promise<OperatorData[]> {
    try {
      // Try to get fresh data from UCCX
      const operators = await this.uccxService.getAgentStats();
      operators.forEach(operator => this.operatorData.set(operator.id, operator));
      return operators;
    } catch (error) {
      this.logger.error('Failed to fetch operators from UCCX:', error);
      // Fallback to cached data
      return Array.from(this.operatorData.values());
    }
  }

  async getHistoricalData(
    operatorId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<OperatorData[]> {
    // In a real implementation, this would query historical data from UCCX
    const operator = this.operatorData.get(operatorId);
    return operator ? [operator] : [];
  }

  updateOperatorStats(operatorId: string, stats: Partial<ResourceIAQStats>): void {
    const operator = this.operatorData.get(operatorId);
    if (operator) {
      operator.ResourceIAQStats = { ...operator.ResourceIAQStats, ...stats };
      this.operatorData.set(operatorId, operator);
      this.logger.debug(`Updated operator ${operatorId} stats`);
    }
  }
} 