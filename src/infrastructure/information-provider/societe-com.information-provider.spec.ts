import { NoResultForInput } from '../information-crawler/information-crawler';
import { SocieteComProvider } from './societe-com.information-provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(60000);

  let provider: SocieteComProvider;

  beforeEach(() => {
    provider = new SocieteComProvider();
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const elements = await provider.getElementsCompanyInfomations('gojob');
    expect(elements).toBeDefined();
    expect(elements.length).toBe(12);
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
