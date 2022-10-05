import { CompanyInformation } from '../../../../domain/company';
import { InformationReferentialDefinition } from '../../../information-referential';

export interface InformationExtractor {
  extractRawData(
    locator: InformationReferentialDefinition,
  ): Promise<CompanyInformation>;
}
