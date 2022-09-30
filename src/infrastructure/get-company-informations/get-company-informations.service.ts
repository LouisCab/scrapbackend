import { Injectable } from '@nestjs/common';
import {
  CompanyInfoProvider,
  RawElement,
} from '../../application/interface/company-info-provider.interface';
import {
  CompanyInfoExtractor,
  ExtractedInformations,
} from '../../application/interface/company-info-extractor.interface';

import { CompanyInformation } from '../../domain/model/company';

@Injectable()
export class GetCompanyInformationsService {
  constructor(
    private readonly providers: CompanyInfoProvider<RawElement[]>[],
    private readonly extractors: CompanyInfoExtractor<ExtractedInformations>[],
  ) {}
  async getCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformation> {
    // const companyRawElements = await this.provider.getElementCompanyInfo(
    //   companyName,
    // );
    console.log(companyName);
    console.log(this.providers);
    console.log(this.extractors);

    // const companyInformations =
    //   await this.informationExtractor.extractInformation(companyRawElements);

    return { test: 'lol' };
  }

  getHello(): string {
    return 'hello world';
  }
}
