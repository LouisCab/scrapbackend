import { LinkedinProvider } from './linkedin.provider';

describe('Linkedin crawler', () => {
  jest.setTimeout(10000);
  it('should retrieve raw page of specified company', async () => {
    const scrapper = new LinkedinProvider('gojob');
    const elements = await scrapper.getElementCompanyInfo();
    console.log(elements);
    expect(elements).toBeDefined();
    expect(elements.length).toBeGreaterThan(0);
  });
});
