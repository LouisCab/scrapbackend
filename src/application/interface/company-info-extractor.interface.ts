import { RawElement } from './crawler.interface';

export type ExtractedInformations = {
  [key: string]: string;
};

export abstract class CompanyInfoExtractor<T extends ExtractedInformations> {
  abstract extractInformation(elements: RawElement[]): Promise<T>;
}
