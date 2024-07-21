import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TokenModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
