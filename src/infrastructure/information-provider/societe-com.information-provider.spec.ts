import { NoResultForInput } from './information-crawler/puppeteer.information-crawler';
import { SocieteComInformationCrawler } from './information-crawler/societe-com.information-crawler';
import { PuppeteerInformationExtractor } from './information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './information-refinery/puppeteer.information-refinery';
import { SocieteComProvider } from './societe-com.information-provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(60000);

  let provider: SocieteComProvider;
  let extractor: PuppeteerInformationExtractor;
  let transformer: PuppeteerInformationRefinery;
  let crawler: SocieteComInformationCrawler;

  beforeEach(() => {
    transformer = new PuppeteerInformationRefinery();
    crawler = new SocieteComInformationCrawler();
    extractor = new PuppeteerInformationExtractor(crawler);

    provider = new SocieteComProvider(extractor, transformer, crawler);
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const elements = await provider.getElementsCompanyInfomations('gojob');
    expect(elements).toBeDefined();
    expect(Object.entries(elements).length).toBe(12);
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
