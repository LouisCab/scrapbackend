import { InformationRefinery } from '../../../application/interface/information-provider/information-refinery/information-refinery.interface';
import { CompanyInformation } from '../../../domain/company';
import { InformationRubricValueDefinition } from '../information-extractor/puppeter.information-extractor';

export class PuppeteerInformationRefinery implements InformationRefinery {
  transformRawData(
    rawData: InformationRubricValueDefinition,
  ): CompanyInformation {
    const regex = new RegExp(/(([\d-])+\s?|([A-zÀ-ú,']+\s|\w+))+(?<!\n)/g);
    let content: RegExpMatchArray | null;
    let companyInformations: CompanyInformation = {};

    for (const rubric of rawData) {
      switch (rubric.htmlMarkupAttribute) {
        case 'innerText':
          content = rubric.rawValue.match(regex);
          break;
        case 'src':
          content = [rubric.rawValue];
          break;
        case 'href':
          content = [rubric.rawValue];
          break;
        default:
          content = null;
          break;
      }

      if (content === null) {
        throw new Error('yéyé');
      }

      companyInformations = {
        ...companyInformations,
        [rubric.property]: content,
      };
    }

    return companyInformations;
  }
}
