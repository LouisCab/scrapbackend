import { Company } from './company';

describe('Company test', () => {
  const company = new Company('TestCompany', {
    creationDate: '28-03-20',
  });
  it('should add information to existing company informations', () => {
    const newProperty = { test: 'test' };
    company.add(newProperty);
    expect(Object.keys(company.informations).length).toEqual(2); // company.companyInformations.length;
  });

  it('should let us know if specified information is already provided for company', () => {
    const exists = company.exists('creationDate');
    expect(exists).toEqual(true);
  });
});
