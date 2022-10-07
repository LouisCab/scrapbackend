import { InformationProvider } from '../../application/interface/information-provider/information-provider.abstract';
import { CompanyInformation } from '../../domain/company';
import { FakeInformationCrawler } from './information-crawler/fake.information-crawler';
import { FakeInformationExtractor } from './information-extractor/fake.information-extractor';
import { FakeInformationRefinery } from './information-refinery/fake.information-refinery';

export class FakeInformationProvider extends InformationProvider<CompanyInformation> {
  constructor(
    private readonly extractor: FakeInformationExtractor,
    private readonly transformer: FakeInformationRefinery,
    private readonly crawler: FakeInformationCrawler,
  ) {
    super();
  }

  getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    throw new Error('not implemented yet');
  }
}
