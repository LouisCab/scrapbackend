import { CompanyInformation } from '../../domain/company';
import { FakeInformationProvider } from '../../infrastructure/information-provider/fake.information-provider';
import { InformationProvider } from '../interface/information-provider/information-provider.abstract';
import { GetCompanyInformationsService } from './get-company-informations.service';

describe('e2e test', () => {
  let informationProvider: InformationProvider<CompanyInformation>;
  let service: GetCompanyInformationsService;

  beforeEach(() => {
    informationProvider = new FakeInformationProvider();
    informationProvider.();
    informationProvider.service = new GetCompanyInformationsService([
      informationProvider,
    ]);
  });
  it('should return company for given name"', async () => {
    const req = 'gojob';
    const company = await service.getInformationsForCompany(req);
    expect(company).toBeDefined();
  });
});
