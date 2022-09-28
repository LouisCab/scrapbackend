// export type RawElementHtml = {
//   [key: string]: string;
// };

import { RawElement } from './crawler.interface';

export abstract class CompanyInfoProvider<T extends RawElement[]> {
  abstract getElementCompanyInfo(companyName: string): Promise<T>;
}
