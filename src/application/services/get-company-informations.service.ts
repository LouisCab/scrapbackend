import { Injectable } from '@nestjs/common';
import { InformationProvider } from '../interface/information-provider/information-provider.abstract';

import { Company, CompanyInformation } from '../../domain/company';

@Injectable()
export class GetCompanyInformationsService {
  constructor(
    private readonly providers: InformationProvider<CompanyInformation>[],
  ) {}
  async getInformationsForCompany(companyName: string): Promise<Company> {
    const company = new Company(companyName);

    for (const provider of this.providers) {
      const elements = await provider.getElementsCompanyInfomations(
        companyName,
      );

      for (const information of elements) {
        company.add(information);
      }
    }
    return company;
  }
}
