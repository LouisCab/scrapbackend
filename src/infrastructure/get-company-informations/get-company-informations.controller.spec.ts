// import { Test, TestingModule } from '@nestjs/testing';
// import { ScrapCompanyInfoHttpController } from './get-company-informations.controller';
// import { GetCompanyInformationsService } from './get-company-informations.service';

// describe('AppController', () => {
//   let scrapController: ScrapCompanyInfoHttpController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [ScrapCompanyInfoHttpController],
//       providers: [GetCompanyInformationsService],
//     }).compile();

//     scrapController = app.get<ScrapCompanyInfoHttpController>(
//       ScrapCompanyInfoHttpController,
//     );
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       const companyName = 'gojob';
//       expect(scrapController.getCompanyInformations(companyName)).toBeDefined();
//     });
//   });
// });
