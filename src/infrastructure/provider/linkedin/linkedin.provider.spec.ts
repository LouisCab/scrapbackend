import { LinkedinProvider } from './linkedin.provider';

describe('Linkedin crawler', () => {
  jest.setTimeout(10000);
  it('should retrieve raw page of specified company', async () => {
    const provider = new LinkedinProvider();
    const elements = await provider.getElementsCompanyInfomations('gojob');

    expect(elements).toBeDefined();
    expect(Object.entries(elements).length).toBe(6);
  });
});
