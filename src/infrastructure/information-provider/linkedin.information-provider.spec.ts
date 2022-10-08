import { CompanyInformationFixtures } from '../../tests/fixtures/CompanyInformationsFixtures';
import { PuppeteerInformationCrawler } from './information-crawler/puppeteer.information-crawler';
import { NoResultForInput } from './information-crawler/puppeteer.information-crawler';
import { PuppeteerInformationExtractor } from './information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './information-refinery/puppeteer.information-refinery';
import { LinkedinProvider } from './linkedin.information-provider';

let provider: LinkedinProvider;
let extractor: PuppeteerInformationExtractor;
let transformer: PuppeteerInformationRefinery;
let crawler: PuppeteerInformationCrawler;

beforeEach(() => {
  transformer = new PuppeteerInformationRefinery();
  crawler = new PuppeteerInformationCrawler();
  extractor = new PuppeteerInformationExtractor(crawler);
  provider = new LinkedinProvider(extractor, transformer, crawler);
});
describe('Linkedin provider', () => {
  it('should retrieve all aimed information on page for specified company', async () => {
    const elements = await provider.getElementsCompanyInfomations('365Talents');

    const expectedElements =
      CompanyInformationFixtures.simpleLinkedin365Talents;
    expect(elements).toBeDefined();
    expect(elements).toEqual(expectedElements);
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
