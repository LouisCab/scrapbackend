import { CompanyInformation } from '../../../../domain/company';
import { InformationRubricValueDefinition } from '../../../../infrastructure/information-provider/information-extractor/puppeter.information-extractor';

export interface InformationRefinery {
  transformRawData(
    rawData: InformationRubricValueDefinition,
  ): CompanyInformation;
}
