import { Injectable, NestMiddleware, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { Key } from 'src/entity/key.entity';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RateLimitMiddleware.name);

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || Array.isArray(apiKey)) {
      this.logger.warn(`Invalid or missing API key: ${apiKey}`);
      return next(new HttpException('Invalid or missing API key', HttpStatus.BAD_REQUEST));
    }

    try {
      this.logger.log(`Processing request with API key: ${apiKey}`);

      const keyRepository = this.dataSource.getRepository(Key);


      const key = await keyRepository.findOne({
        where: { id: apiKey as string, isActive: true },
      });

      if (!key) {
        this.logger.warn(`Key not found or inactive for API key: ${apiKey}`);
        return next(new HttpException('Key not found or inactive', HttpStatus.FORBIDDEN));
      }


      if (key.rateLimit <= 0 || key.expiresAt < new Date()) {
        this.logger.warn(`Rate limit exceeded or key expired for API key: ${apiKey}`);
        return next(new HttpException('Rate limit exceeded or key expired', HttpStatus.FORBIDDEN));
      }


      key.rateLimit -= 1;
      await keyRepository.save(key);

      this.logger.log(`Request approved for API key: ${apiKey}. Remaining rate limit: ${key.rateLimit}`);


      next();
    } catch (error) {
      this.logger.error(`Internal server error for API key: ${apiKey}`, error.stack);
      next(new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}
