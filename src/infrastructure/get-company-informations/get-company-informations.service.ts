import { Injectable } from '@nestjs/common';
import { CompanyInfoProvider } from '../../application/interface/company-info-crawler.interface';
import {
  CompanyInfoExtractor,
  ExtractedInformations,
} from '../../application/interface/company-info-extractor.interface';
import { RawElement } from '../../application/interface/crawler.interface';
import { CompanyInformations } from '../../domain/model/company';

@Injectable()
export class ScrapService {
  private readonly webCrawler: CompanyInfoProvider<RawElement[]>;
  private readonly informationExtractor: CompanyInfoExtractor<ExtractedInformations>;
  async getCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformations> {
    const companyRawElements = await this.webCrawler.getElementCompanyInfo(
      companyName,
    );

    const companyInformations =
      await this.informationExtractor.extractInformation(companyRawElements);

    return companyInformations;
  }

  getHello(): string {
    return 'hello world';
  }
}
