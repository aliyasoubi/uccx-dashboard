import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { RedisModule } from './modules/redis/redis.module';
import { UccxModule } from './modules/uccx/uccx.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { DataSourcesModule } from './modules/data-sources/data-sources.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    UccxModule,
    WebsocketModule,
    DataSourcesModule,
  ],
})
export class AppModule {} 