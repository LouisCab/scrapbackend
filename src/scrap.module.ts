import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InformationReferential } from './application/information-referential';
import { ScrapCompanyHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { GetCompanyInformationsService } from './infrastructure/get-company-informations/get-company-informations.service';
import { InformationCrawler } from './infrastructure/information-crawler/information-crawler';
import { LinkedinInformationCrawler } from './infrastructure/information-crawler/linkedin.information-crawler';
import { SocieteComInformationCrawler } from './infrastructure/information-crawler/societe-com.information-crawler';
import { PuppeteerInformationExtractor } from './infrastructure/information-provider/information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './infrastructure/information-provider/information-refinery/puppeteer-information-refinery';
import { LinkedinProvider } from './infrastructure/information-provider/linkedin.information-provider';
import { SocieteComProvider } from './infrastructure/information-provider/societe-com.information-provider';

const crawlers = [
  {
    provide: LinkedinInformationCrawler,
    inject: [],
    useFactory() {
      return new LinkedinInformationCrawler();
    },
  },
  {
    provide: SocieteComInformationCrawler,
    inject: [],
    useFactory() {
      return new SocieteComInformationCrawler();
    },
  },
];

const refineries = [
  {
    provide: PuppeteerInformationRefinery,
    inject: [],
    useFactory() {
      return new PuppeteerInformationRefinery();
    },
  },
];

const extractors = [
  {
    provide: PuppeteerInformationExtractor,
    inject: [SocieteComInformationCrawler, LinkedinInformationCrawler],
    useFactory: (crawler: InformationCrawler) => {
      return new PuppeteerInformationExtractor(crawler);
    },
  },
];

const linkedinProvider = {
  provide: LinkedinProvider,
  inject: [
    LinkedinInformationCrawler,
    PuppeteerInformationExtractor,
    PuppeteerInformationRefinery,
    InformationReferential,
  ],
  useFactory: (
    extractor: PuppeteerInformationExtractor,
    refinery: PuppeteerInformationRefinery,
    crawler: LinkedinInformationCrawler,
    referential: InformationReferential,
  ) => {
    return new LinkedinProvider(extractor, refinery, crawler, referential);
  },
};

const societeComProvider = {
  provide: SocieteComProvider,
  inject: [
    PuppeteerInformationExtractor,
    PuppeteerInformationRefinery,
    SocieteComInformationCrawler,
    InformationReferential,
  ],
  useFactory: (
    extractor: PuppeteerInformationExtractor,
    refinery: PuppeteerInformationRefinery,
    crawler: SocieteComInformationCrawler,
    referential: InformationReferential,
  ) => {
    return new SocieteComProvider(extractor, refinery, crawler, referential);
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
    ...extractors,
    ...refineries,
    linkedinProvider,
    societeComProvider,
    getCompanyInformationsService,
  ],
})
export class ScrapModule {}
