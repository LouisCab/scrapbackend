import { SocieteComProvider } from './societe-com.provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(10000);
  it('should retrieve raw page of specified company', async () => {
    const scrapper = new SocieteComProvider('gojob');
    const elements = await scrapper.getElementCompanyInfo();

    expect(elements).toBeDefined();
    expect(elements.length).toBeGreaterThan(0);
  });
});
