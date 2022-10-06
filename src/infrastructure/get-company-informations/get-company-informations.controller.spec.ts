import { Test, TestingModule } from '@nestjs/testing';
import { ScrapCompanyHttpController } from './get-company-informations.controller';
import { GetCompanyInformationsService } from './get-company-informations.service';
import { FactoryProvider } from '@nestjs/common';
import { LinkedinProvider } from '../information-provider/linkedin.information-provider';
import { SocieteComProvider } from '../information-provider/societe-com.information-provider';
import { LinkedinInformationCrawler } from '../information-crawler/linkedin.information-crawler';
import { SocieteComInformationCrawler } from '../information-crawler/societe-com.information-crawler';
import { PuppeteerInformationExtractor } from '../information-provider/information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from '../information-provider/information-refinery/puppeteer-information-refinery';

describe('AppController', () => {
  jest.setTimeout(60000);
  let app: TestingModule;
  let scrapController: ScrapCompanyHttpController;

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
    useFactory: (
      linkedin: LinkedinProvider,
      societeCom: SocieteComProvider,
    ) => {
      return new GetCompanyInformationsService([linkedin, societeCom]);
    },
  };

  beforeEach(async () => {
    app = await Test.createTestingModule({
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
    }).compile();

    scrapController = app.get<ScrapCompanyHttpController>(
      ScrapCompanyHttpController,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('e2e test', () => {
    it('should return company for given name"', async () => {
      const req = { companyName: 'gojob' };
      const company = await scrapController.getCompanyInformations(req);
      expect(company).toBeDefined();
    });
  });
});
