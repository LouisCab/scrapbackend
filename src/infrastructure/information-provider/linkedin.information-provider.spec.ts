import { NoResultForInput } from '../information-crawler/information-crawler';
import { LinkedinInformationCrawler } from '../information-crawler/linkedin.information-crawler';
import { SocieteComInformationCrawler } from '../information-crawler/societe-com.information-crawler';
import { PuppeteerInformationExtractor } from './information-extractor/puppeter.information-extractor';
import { linkedinInformationLocator } from './information-referential/linkedin.information-referential';
import { PuppeteerInformationRefinery } from './information-refinery/puppeteer-information-refinery';
import { LinkedinProvider } from './linkedin.information-provider';

let provider: LinkedinProvider;
let extractor: PuppeteerInformationExtractor;
let transformer: PuppeteerInformationRefinery;
let crawler: SocieteComInformationCrawler;
const referential = linkedinInformationLocator;

beforeEach(() => {
  transformer = new PuppeteerInformationRefinery();
  crawler = new LinkedinInformationCrawler();
  extractor = new PuppeteerInformationExtractor(crawler);
  provider = new LinkedinProvider(extractor, transformer, crawler, referential);
});
describe('Linkedin provider', () => {
  it('should retrieve all aimed information on page for specified company', async () => {
    const elements = await provider.getElementsCompanyInfomations('gojob');
    expect(elements).toBeDefined();
    expect(Object.entries(elements).length).toBe(6);
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
