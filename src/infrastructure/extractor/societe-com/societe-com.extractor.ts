import { RawElement } from '../../../application/interface/company-info-provider.interface';
import { CompanyInformations } from '../../../domain/model/company';
import { SOCIETE_COM_MAPPING } from './societe-com.mapping';

export class SocieteComExtractor {
  extractInfoFromMapping(elements: RawElement[]): CompanyInformations {
    const companyInformations: CompanyInformations = {};
    for (const key of Object.keys(SOCIETE_COM_MAPPING)) {
      const index = elements.indexOf(SOCIETE_COM_MAPPING[key]);
      const value = elements[index + 1];
      if (index !== -1 && value && value != '') {
        companyInformations[key] = value;
      }
    }

    return companyInformations;
  }
}
