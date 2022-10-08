import { Injectable } from '@nestjs/common';
import { InformationProvider } from '../interface/information-provider/information-provider.abstract';

import { Company, CompanyInformation } from '../../domain/company';

class ApplicativeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NoCompanyInformationExtracted extends ApplicativeError {
  constructor(companyName: string) {
    super(`Could not retrieve information for ${companyName}. `);
  }
}

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

    if (Object.entries(company.companyInformations).length === 0) {
      throw new NoCompanyInformationExtracted(companyName);
    }
    return company;
  }
}
