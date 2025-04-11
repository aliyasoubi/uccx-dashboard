import { Module } from '@nestjs/common';
import { UccxService } from './uccx.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [UccxService],
  exports: [UccxService],
})
export class UccxModule {} 