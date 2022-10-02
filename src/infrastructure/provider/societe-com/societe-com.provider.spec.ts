import { SocieteComProvider } from './societe-com.provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(10000);
  it('should retrieve raw page of specified company', async () => {
    const provider = new SocieteComProvider();
    const elements = await provider.getElementCompanyInfo('gojob');

    expect(elements).toBeDefined();
    expect(elements.length).toBeGreaterThan(0);
  });
});
