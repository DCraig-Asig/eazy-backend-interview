import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import getConfig from '@config';
import { Controllers } from '@controllers';
import { Entities } from '@entities';
import { CacheControlMiddleware, RequestLoggerMiddleware } from '@middlewares';
import { Services } from '@services';
import { UtilityServices } from '@utilities';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
    }),
    HttpModule.register({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        entities: Entities,
      }),
    }),
  ],
  controllers: Controllers,
  providers: [...Services, ...UtilityServices],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CacheControlMiddleware, RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
