import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScrapCompanyInfoHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { ScrapService } from './infrastructure/get-company-informations/get-company-informations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
    }),
  ],
  controllers: [ScrapCompanyInfoHttpController],
  providers: [ScrapService],
})
export class ScrapModule {}
