import { CompanyInformationFixtures } from '../../tests/fixtures/CompanyInformationsFixtures';
import {
  NoResultForInput,
  PuppeteerInformationCrawler,
} from './information-crawler/puppeteer.information-crawler';
import { PuppeteerInformationExtractor } from './information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './information-refinery/puppeteer.information-refinery';
import { SocieteComProvider } from './societe-com.information-provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(60000);

  let provider: SocieteComProvider;
  let extractor: PuppeteerInformationExtractor;
  let transformer: PuppeteerInformationRefinery;
  let crawler: PuppeteerInformationCrawler;

  beforeEach(() => {
    transformer = new PuppeteerInformationRefinery();
    crawler = new PuppeteerInformationCrawler();
    extractor = new PuppeteerInformationExtractor(crawler);

    provider = new SocieteComProvider(extractor, transformer, crawler);
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const elements = await provider.getElementsCompanyInfomations('365Talents');
    const expectedElements =
      CompanyInformationFixtures.simpleSocieteCom365Talents;
    expect(elements).toBeDefined();
    expect(Object.entries(elements).length).toBe(12);
    expect(elements).toEqual(expectedElements);
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
