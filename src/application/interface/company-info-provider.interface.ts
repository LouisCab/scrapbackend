// export type RawElementHtml = {
//   [key: string]: string;
// };

import { RawElement } from '../../infrastructure/crawler/provider';

export abstract class CompanyInfoProvider<T extends RawElement[]> {
  abstract getElementCompanyInfo(companyName: string): Promise<T>;
}
