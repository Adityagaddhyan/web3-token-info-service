import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  getTokenInfo(apiKey: string): any {
    return {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '2000 USD',
      marketCap: '200 Billion USD',
    };
  }
}
