import { InformationProvider } from '../../application/interface/information-provider/information-provider.abstract';
import { CompanyInformation } from '../../domain/company';
import { InfrastructureError } from './information-crawler/puppeteer.information-crawler';
export class CompanyNotFound extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}
export class FakeInformationProvider extends InformationProvider<CompanyInformation> {
  private informations = new Map<string, CompanyInformation[]>();
  set setInformation(companyName: string) {
    this.informations.set(companyName, [{ creationDate: 'test' }]);
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    const companyInformations = this.informations.get(companyName);
    if (!companyInformations || !companyInformations.values()) {
      throw new CompanyNotFound('Company not found');
    }

    return companyInformations;
  }
}
