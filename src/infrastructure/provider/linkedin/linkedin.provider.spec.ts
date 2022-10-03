import { LinkedinProvider } from './linkedin.provider';

describe('Linkedin crawler', () => {
  it('should retrieve raw page of specified company', async () => {
    const provider = new LinkedinProvider();
    const elements = await provider.getElementsCompanyInfomations('gojob');

    expect(elements).toBeDefined();
    console.log(elements);
    expect(Object.entries(elements).length).toBe(6);
  });
});
