import { Module } from '@nestjs/common';
import { RedisModule } from './modules/redis/redis.module';
import { UccxModule } from './modules/uccx/uccx.module';
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [
    RedisModule,
    UccxModule,
    WebsocketModule,
  ],
})
export class AppModule {} 