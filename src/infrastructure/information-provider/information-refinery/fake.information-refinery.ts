import { InformationRubricValueDefinition } from '../../../application/interface/information-provider/information-extractor/information-extractor.interface';
import { InformationRefinery } from '../../../application/interface/information-provider/information-refinery/information-refinery.interface';
import { CompanyInformation } from '../../../domain/company';
import { InfrastructureError } from '../information-crawler/puppeteer.information-crawler';

class ContentIsEmptyError extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}

class NoMatchingHtmlMarkupAttribute extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}

export class FakeInformationRefinery implements InformationRefinery {
  transformRawData(
    rawData: InformationRubricValueDefinition,
  ): CompanyInformation[] {
    const companyInformations: CompanyInformation[] = [];

    for (const rubric of rawData) {
      let companyInformation: CompanyInformation = {};
      if (rubric.extractMethod) {
        const content = rubric.rawValue.match(rubric.extractMethod);
        if (content === null) {
          throw new ContentIsEmptyError(
            `Cannot refine ${rubric.rawValue}, content is empty.`,
          );
        }
        companyInformation = {
          [rubric.property]: content[0],
        };
      } else {
        companyInformation = { [rubric.property]: rubric.rawValue };
      }

      companyInformations.push(companyInformation);
    }
    return companyInformations;
  }
}
