import { InformationRefinery } from '../../../application/interface/information-provider/information-refinery/information-refinery.interface';
import { CompanyInformation } from '../../../domain/company';
import { InfrastructureError } from '../../information-crawler/information-crawler';
import { InformationRubricValueDefinition } from '../information-extractor/puppeter.information-extractor';

class ContentIsEmptyError extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}

export class PuppeteerInformationRefinery implements InformationRefinery {
  transformRawData(
    rawData: InformationRubricValueDefinition,
  ): CompanyInformation[] {
    const regex = new RegExp(/(([\d-])+\s?|([A-zÀ-ú,']+\s|\w+))+(?<!\n)/g);
    let content: RegExpMatchArray | string | null;
    const companyInformations: CompanyInformation[] = [];

    for (const rubric of rawData) {
      switch (rubric.htmlMarkupAttribute) {
        case 'innerText':
          const regexArraycontent = rubric.rawValue.match(regex);
          if (regexArraycontent === null) {
            throw new ContentIsEmptyError(
              `Cannot refine ${rubric.rawValue}, content is empty.`,
            );
          }
          content = regexArraycontent[0];
          break;
        case 'src':
          console.log('raw value : ', rubric.rawValue);
          content = rubric.rawValue;
          console.log('content : ', content);
          break;
        case 'href':
          content = rubric.rawValue;
          break;
        default:
          content = null;
          break;
      }

      companyInformations.push({ [rubric.property]: content });
    }
    console.log(companyInformations);
    return companyInformations;
  }
}
