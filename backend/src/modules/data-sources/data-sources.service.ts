import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { QueueService } from './queue.service';
import { OutboundService } from './outbound.service';
import { SurveyService } from './survey.service';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class DataSourcesService {
  private logger = new Logger(DataSourcesService.name);

  constructor(
    private readonly operatorService: OperatorService,
    private readonly queueService: QueueService,
    private readonly outboundService: OutboundService,
    private readonly surveyService: SurveyService,
    private readonly tenantsService: TenantsService,
  ) {}

  async getAggregatedData(tenantId: string, userId: string, role: string) {
    const tenant = this.tenantsService.getTenant(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const { dataSources, accessControl } = tenant.settings;
    const userPermissions = accessControl.permissions[role] || [];

    const data: Record<string, any> = {};

    if (dataSources.includes('operator') && userPermissions.includes('view_own')) {
      data.operator = await this.operatorService.getOperatorData(userId);
    }

    if (dataSources.includes('queue') && userPermissions.includes('view_queue')) {
      data.queue = await this.queueService.getQueueData('queue1');
    }

    if (dataSources.includes('outbound') && userPermissions.includes('view_all')) {
      data.outbound = await this.outboundService.getOutboundData('campaign1');
    }

    if (dataSources.includes('survey') && userPermissions.includes('view_all')) {
      data.survey = await this.surveyService.getSurveyData('survey1');
    }

    return data;
  }

  async getHistoricalData(
    tenantId: string,
    userId: string,
    role: string,
    startTime: Date,
    endTime: Date,
  ) {
    const tenant = this.tenantsService.getTenant(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const { dataSources, accessControl } = tenant.settings;
    const userPermissions = accessControl.permissions[role] || [];

    const data: Record<string, any> = {};

    if (dataSources.includes('operator') && userPermissions.includes('view_own')) {
      data.operator = await this.operatorService.getHistoricalData(userId, startTime, endTime);
    }

    if (dataSources.includes('queue') && userPermissions.includes('view_queue')) {
      data.queue = await this.queueService.getHistoricalData('queue1', startTime, endTime);
    }

    if (dataSources.includes('outbound') && userPermissions.includes('view_all')) {
      data.outbound = await this.outboundService.getHistoricalData('campaign1', startTime, endTime);
    }

    if (dataSources.includes('survey') && userPermissions.includes('view_all')) {
      data.survey = await this.surveyService.getHistoricalData('survey1', startTime, endTime);
    }

    return data;
  }
} 