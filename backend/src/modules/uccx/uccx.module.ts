import { Module } from '@nestjs/common';
import { UccxService } from './uccx.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [UccxService],
  exports: [UccxService],
})
export class UccxModule {} 