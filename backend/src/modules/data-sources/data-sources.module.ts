import { Module } from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { OperatorService } from './operator.service';
import { QueueService } from './queue.service';
import { OutboundService } from './outbound.service';
import { SurveyService } from './survey.service';
import { TenantsModule } from '../tenants/tenants.module';
import { UccxModule } from '../uccx/uccx.module';

@Module({
  imports: [TenantsModule, UccxModule],
  providers: [
    DataSourcesService,
    OperatorService,
    QueueService,
    OutboundService,
    SurveyService,
  ],
  exports: [DataSourcesService],
})
export class DataSourcesModule {} 