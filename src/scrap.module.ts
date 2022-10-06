import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScrapCompanyHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { GetCompanyInformationsService } from './infrastructure/get-company-informations/get-company-informations.service';
import { LinkedinInformationCrawler } from './infrastructure/information-crawler/linkedin.information-crawler';
import { SocieteComInformationCrawler } from './infrastructure/information-crawler/societe-com.information-crawler';
import { PuppeteerInformationExtractor } from './infrastructure/information-provider/information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './infrastructure/information-provider/information-refinery/puppeteer-information-refinery';
import { LinkedinProvider } from './infrastructure/information-provider/linkedin.information-provider';
import { SocieteComProvider } from './infrastructure/information-provider/societe-com.information-provider';

const crawlers = [
  {
    provide: LinkedinInformationCrawler,
    useClass: LinkedinInformationCrawler,
  },
  {
    provide: SocieteComInformationCrawler,
    useClass: SocieteComInformationCrawler,
  },
];

const refineries = [
  {
    provide: PuppeteerInformationRefinery,
    useClass: PuppeteerInformationRefinery,
  },
];

const extractorLinkedin = {
  provide: PuppeteerInformationExtractor,
  inject: [LinkedinInformationCrawler],
  useFactory: (crawler: LinkedinInformationCrawler) => {
    return new PuppeteerInformationExtractor(crawler);
  },
};

const extractorSocieteCom = {
  provide: PuppeteerInformationExtractor,
  inject: [SocieteComInformationCrawler],
  useFactory: (crawler: SocieteComInformationCrawler) => {
    return new PuppeteerInformationExtractor(crawler);
  },
};
const linkedinProvider = {
  provide: LinkedinProvider,
  inject: [
    PuppeteerInformationExtractor,
    PuppeteerInformationRefinery,
    LinkedinInformationCrawler,
  ],
  useFactory: (
    _extractor: PuppeteerInformationExtractor,
    refinery: PuppeteerInformationRefinery,
    crawler: LinkedinInformationCrawler,
  ) => {
    return new LinkedinProvider(
      new PuppeteerInformationExtractor(crawler),
      refinery,
      crawler,
    );
  },
};

const societeComProvider = {
  provide: SocieteComProvider,
  inject: [
    PuppeteerInformationExtractor,
    PuppeteerInformationRefinery,
    SocieteComInformationCrawler,
  ],
  useFactory: (
    _extractor: PuppeteerInformationExtractor,
    refinery: PuppeteerInformationRefinery,
    crawler: LinkedinInformationCrawler,
  ) => {
    return new SocieteComProvider(
      new PuppeteerInformationExtractor(crawler),
      refinery,
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
  controllers: [ScrapCompanyHttpController],
  providers: [
    ...crawlers,
    ...refineries,
    extractorLinkedin,
    extractorSocieteCom,
    linkedinProvider,
    societeComProvider,
    getCompanyInformationsService,
  ],
})
export class ScrapModule {}
