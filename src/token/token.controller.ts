import { Controller, Get, Req } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token-info')
export class TokenController {
  constructor(private readonly tokenInfoService: TokenService) {}

  @Get()
  getTokenInfo(@Req() req): any {
    const apiKey = req.headers['x-api-key'] as string;
    return this.tokenInfoService.getTokenInfo(apiKey);
  }
}
