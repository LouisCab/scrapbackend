import { Test, TestingModule } from '@nestjs/testing';
import { SocieteComProvider } from '../information-provider/societe-com/societe-com.information-provider';
import { ScrapCompanyHttpController } from './get-company-informations.controller';
import { GetCompanyInformationsService } from './get-company-informations.service';
import { FactoryProvider } from '@nestjs/common';
import { LinkedinProvider } from '../information-provider/linkedin/linkedin.information-provider';

describe('AppController', () => {
  jest.setTimeout(60000);
  let app: TestingModule;
  let scrapController: ScrapCompanyHttpController;
  const providers = [
    {
      provide: LinkedinProvider,
      inject: [],
      useFactory() {
        return new LinkedinProvider();
      },
    },
    {
      provide: SocieteComProvider,
      inject: [],
      useFactory() {
        return new SocieteComProvider();
      },
    },
  ];

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
      providers: [...providers, getCompanyInformationsService],
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
      const companyName = 'gojob';
      const company = await scrapController.getCompanyInformations(companyName);
      expect(company).toBeDefined();
    });
  });
});
