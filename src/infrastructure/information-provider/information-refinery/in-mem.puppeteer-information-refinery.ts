import { InformationRubricValueDefinition } from '../../../application/interface/information-provider/information-extractor/information-extractor.interface';
import { InformationRefinery } from '../../../application/interface/information-provider/information-refinery/information-refinery.interface';
import { CompanyInformation } from '../../../domain/company';
import { InfrastructureError } from '../../information-crawler/information-crawler';

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

export class InMemInformationRefinery implements InformationRefinery {
  transformRawData(
    rawData: InformationRubricValueDefinition,
  ): CompanyInformation[] {
    const regex = new RegExp(/(([\d-])+\s?|([A-zÀ-ú,']+\s|\w+))+(?<!\n)/g);
    let content: string;
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
          throw new NoMatchingHtmlMarkupAttribute(
            `${rubric.htmlMarkupAttribute} is not referenced`,
          );
          break;
      }
      companyInformations.push({ [rubric.property]: content });
    }
    return companyInformations;
  }
}
