import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyInfoProvider } from './application/interface/company-info-provider.interface';
import { LinkedinCrawler } from './infrastructure/crawler/linkedin/linkedin.crawler';
import { SocieteComCrawler } from './infrastructure/crawler/societe-com/societe-com.crawler';
import { ScrapCompanyInfoHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { GetCompanyInformationService } from './infrastructure/get-company-informations/get-company-informations.service';

const crawlers: FactoryProvider = {
  provide: GetCompanyInformationService,
  inject: [SocieteComCrawler, LinkedinCrawler],
  useFactory: (societeComCrawler, linkedinCrawler) => {
    return [
      new CompanyInfoProvider(societeComCrawler),
      new CompanyInfoProvider(linkedinCrawler),
    ];
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
    }),
  ],
  controllers: [ScrapCompanyInfoHttpController],
  providers: [crawlers],
})
export class ScrapModule {}
