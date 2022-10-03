import { Test, TestingModule } from '@nestjs/testing';
import { SocieteComProvider } from '../provider/societe-com/societe-com.provider';
import { ScrapCompanyHttpController } from './get-company-informations.controller';
import { GetCompanyInformationsService } from './get-company-informations.service';
import { FactoryProvider } from '@nestjs/common';
import { LinkedinProvider } from '../provider/linkedin/linkedin.provider';

describe('AppController', () => {
  jest.setTimeout(20000);
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
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScrapCompanyHttpController],
      providers: [...providers, getCompanyInformationsService],
    }).compile();

    scrapController = app.get<ScrapCompanyHttpController>(
      ScrapCompanyHttpController,
    );
  });

  describe('e2e test', () => {
    it('should return company for given name"', async () => {
      const companyName = 'gojob';
      const company = await scrapController.getCompanyInformations(companyName);
      console.log(company);
      console.log(company.informations);
      expect(company).toBeDefined();
    });
  });
});
