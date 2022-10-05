import { CompanyInformation } from '../../../domain/company';
import { InformationRubricDefinition } from '../../information-referential';

export interface InformationLocator {
  locateRawData(
    locator: InformationRubricDefinition,
  ): Promise<CompanyInformation>;
}
