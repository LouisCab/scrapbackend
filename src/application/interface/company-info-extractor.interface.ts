import { CompanyInformation } from '../../domain/model/company';
import { RawElement } from './company-info-provider.interface';

export type ExtractedInformations = {
  [key: string]: string;
};

export abstract class CompanyInfoExtractor<T extends CompanyInformation> {
  abstract extractInformation(elements: RawElement[]): Promise<T>;
}
