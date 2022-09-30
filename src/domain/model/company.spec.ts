import { Company } from './company';

describe('Company test', () => {
  it('should add information to existing company informations', () => {
    const newProperty = { test: 'test' };
    const company = new Company('TestCompany', {
      creationDate: '28-03-20',
    });
    company.add(newProperty);
    expect(Object.keys(company.informations).length).toEqual(2); // company.companyInformations.length;
  });
});
