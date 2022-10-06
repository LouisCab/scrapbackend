import { CompanyInformation } from '../../../../domain/company';
import { InformationRubricValueDefinition } from '../information-extractor/information-extractor.interface';

export interface InformationRefinery {
  transformRawData(
    rawData: InformationRubricValueDefinition,
  ): CompanyInformation[];
}
