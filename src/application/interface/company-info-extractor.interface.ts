import { CompanyInformations } from '../../domain/model/company';
import { RawElement } from './company-info-provider.interface';

export type ExtractedInformations = {
  [key: string]: string;
};

export abstract class CompanyInfoExtractor<T extends CompanyInformations> {
  abstract extractInformation(elements: RawElement[]): Promise<T>;
}
