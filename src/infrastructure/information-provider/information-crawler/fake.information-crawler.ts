import { CompanyInformation } from '../../../domain/company';
import { PuppeteerInformationCrawler } from './puppeteer.information-crawler';

export class FakeInformationCrawler extends PuppeteerInformationCrawler {
  async extractCompanyInformations(
    key: string,
    selector: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation> {
    return { ['creationDate']: 'lolilol' };
  }
}
