import { Injectable } from '@nestjs/common';
import { CompanyInfoProvider } from '../../application/interface/company-info-provider.interface';

import { Company, CompanyInformation } from '../../domain/company';

@Injectable()
export class GetCompanyInformationsService {
  constructor(
    private readonly providers: CompanyInfoProvider<CompanyInformation>[],
  ) {}
  async getInformationsForCompany(companyName: string): Promise<Company> {
    const company = new Company(companyName);
    for (const provider of this.providers) {
      const elements = await provider.getElementsCompanyInfomations(
        companyName,
      );
      let key: keyof CompanyInformation;
      // console.log('elements ===> ', elements);
      for (key in elements) {
        // for (const element of Object.keys(elements)) {
        //   console.log('element ===> ', element);
        //   const [key] = Object.keys(element) as Array<keyof CompanyInformation>;
        //   console.log('key ===> ', key);
        if (!company.exists(key)) {
          company.add({ [key]: elements[key] });
        }
      }
      // }
    }

    return company;
  }

  getHello(): string {
    return 'hello world';
  }
}
