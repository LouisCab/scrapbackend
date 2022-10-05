import { Injectable } from '@nestjs/common';
import { InformationProvider } from '../../application/interface/information-provider/information-provider.interface';

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
        for (const [key, value] of Object.entries(information)) {
          if (!company.exists(key as keyof CompanyInformation)) {
            company.add({ [key]: value });
          }
        }
      }
    }

    return company;
  }

  getHello(): string {
    return 'hello world';
  }
}
