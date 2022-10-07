import { InformationCrawler } from '../../../application/interface/information-provider/information-crawler/information-crawler.abstract';
import { CompanyInformation } from '../../../domain/company';

export class FakeInformationCrawler extends InformationCrawler {
  async extractCompanyInformations(
    key: string,
    selector: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation> {
    return { ['creationDate']: 'lolilol' };
  }
}
