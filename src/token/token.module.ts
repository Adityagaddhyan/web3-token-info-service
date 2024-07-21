
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { DatabaseModule } from 'src/database/database.module';
import { RateLimitMiddleware } from 'src/rate-limit/rate-limit.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [TokenController],
  providers: [TokenService, RateLimitMiddleware],
})
export class TokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes('token-info');
  }
}
