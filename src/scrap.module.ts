import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetCompanyInformationsController } from './infrastructure/controller/get-company-informations.controller';
import { GetCompanyInformationsService } from './application/services/get-company-informations.service';
import { PuppeteerInformationExtractor } from './infrastructure/information-provider/information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './infrastructure/information-provider/information-refinery/puppeteer.information-refinery';
import { LinkedinProvider } from './infrastructure/information-provider/linkedin.information-provider';
import { SocieteComProvider } from './infrastructure/information-provider/societe-com.information-provider';
import { PuppeteerInformationCrawler } from './infrastructure/information-provider/information-crawler/puppeteer.information-crawler';

const crawlers = [
  {
    provide: PuppeteerInformationCrawler,
    useClass: PuppeteerInformationCrawler,
  },
];

const linkedinProvider = {
  provide: LinkedinProvider,
  inject: [PuppeteerInformationCrawler],
  useFactory: (crawler: PuppeteerInformationCrawler) => {
    return new LinkedinProvider(
      new PuppeteerInformationExtractor(crawler),
      new PuppeteerInformationRefinery(),
      crawler,
    );
  },
};

const societeComProvider = {
  provide: SocieteComProvider,
  inject: [PuppeteerInformationCrawler],
  useFactory: (crawler: PuppeteerInformationCrawler) => {
    return new SocieteComProvider(
      new PuppeteerInformationExtractor(crawler),
      new PuppeteerInformationRefinery(),
      crawler,
    );
  },
};

const getCompanyInformationsService: FactoryProvider = {
  provide: GetCompanyInformationsService,
  inject: [LinkedinProvider, SocieteComProvider],
  useFactory: (linkedin: LinkedinProvider, societeCom: SocieteComProvider) => {
    return new GetCompanyInformationsService([linkedin, societeCom]);
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
    }),
  ],
  controllers: [GetCompanyInformationsController],
  providers: [
    ...crawlers,
    linkedinProvider,
    societeComProvider,
    getCompanyInformationsService,
  ],
})
export class ScrapModule {}
