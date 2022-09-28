import { CompanyInfoProvider } from '../interface/company-info-crawler.interface';
import {
  CompanyInfoExtractor,
  ExtractedInformations,
} from '../interface/company-info-extractor.interface';
import { RawElement } from '../interface/crawler.interface';

export class GatherCompanyInformationQueryHandler {
  constructor(
    private readonly webCrawler: CompanyInfoProvider<RawElement[]>,
    private readonly informationExtractor: CompanyInfoExtractor<ExtractedInformations>,
  ) {}
  async execute(companyName: string) {
    const companyRawElements = await this.webCrawler.getElementCompanyInfo(
      companyName,
    );

    const companyInformations =
      await this.informationExtractor.extractInformation(companyRawElements);

    return companyInformations;
  }
}
