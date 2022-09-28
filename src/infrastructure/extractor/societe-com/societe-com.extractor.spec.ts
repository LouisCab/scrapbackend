import { SocieteComExtractor } from './societe-com.extractor';

describe('Extractor test', () => {
  let extractor: SocieteComExtractor;

  const elements = [
    'Date création entreprise',
    '01-01-23',
    'Noms commerciaux',
    'Test purposes',
  ];
  beforeEach(() => {
    extractor = new SocieteComExtractor();
  });
  it('should extract information from mapping', () => {
    const companyInformations = extractor.extractInfoFromMapping(elements);
    expect(companyInformations).toEqual({
      creationDate: '01-01-23',
      commercialName: 'Test purposes',
    });
  });
  it('should skip element if not present in mapping', () => {
    elements.push('Not present in mapping', 'Value should not be present');
    const companyInformations = extractor.extractInfoFromMapping(elements);
    expect(companyInformations).toEqual({
      creationDate: '01-01-23',
      commercialName: 'Test purposes',
    });
  });
  it('should skip element if value is empty', () => {
    elements.push('Numéro SIREN', '');
    const companyInformations = extractor.extractInfoFromMapping(elements);
    expect(companyInformations).toEqual({
      creationDate: '01-01-23',
      commercialName: 'Test purposes',
    });
  });
});
