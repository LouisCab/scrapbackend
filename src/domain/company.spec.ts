import { Company, CompanyInformation } from './company';

describe('Company test', () => {
  const company = new Company('TestCompany', {
    creationDate: '28-03-20',
  });
  it('should add information to existing company informations', () => {
    const newProperty: CompanyInformation = { logo: 'test' };
    company.add(newProperty);
    expect(Object.keys(company.companyInformations).length).toEqual(2);
  });
});
