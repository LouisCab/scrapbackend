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
    const elements = await provider.getElementsCompanyInfomations('gojob');
    console.log(elements);
    const expectedElements = [
      {
        website:
          'https://www.linkedin.com/redir/redirect?url=http%3A%2F%2Fwww%2Egojob%2Ecom&urlhash=mSq9&trk=about_website',
      },
      { activitySector: 'Services de ressources humaines' },
      { companySize: '51-200 employés' },
      { headOfficeLocation: 'Aix-en-Provence, Provence-Alpes-Côte d’Azur' },
      { employeeOnLinkedin: 'Voir les 234 employés' },
      {
        logo: 'https://media-exp1.licdn.com/dms/image/C4D0BAQHapeu_TWa5Kw/company-logo_200_200/0/1539280297084?e=2147483647&v=beta&t=EnkWGf28-QhXZiHlr_CrbpKnq6JnYRlUxHe66gt7XdM',
      },
    ];
    expect(elements).toBeDefined();
    expect(elements).toEqual(expectedElements);
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
