import { Module } from '@nestjs/common';
import { ScrapController } from './app.controller';
import { ScrapService } from './app.service';

@Module({
  imports: [],
  controllers: [ScrapController],
  providers: [ScrapService],
})
export class ScrapModule {}
