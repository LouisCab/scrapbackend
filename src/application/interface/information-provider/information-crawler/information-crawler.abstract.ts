import { CompanyInformation } from '../../../../domain/company';

export abstract class InformationCrawler {
  abstract extractCompanyInformations(
    key: string,
    identifier: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation>;
}
