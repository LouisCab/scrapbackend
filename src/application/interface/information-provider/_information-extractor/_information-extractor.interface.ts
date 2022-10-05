import { CompanyInformation } from '../../../../domain/company';
import { InformationRubricDefinition } from '../../../information-referential';

interface InformationExtractor2 {
  extractRawData(
    locator: InformationRubricDefinition,
    value: string,
  ): CompanyInformation;
}
