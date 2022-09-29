export type RawElement = string;

export abstract class CompanyInfoProvider<T extends RawElement[]> {
  abstract getElementCompanyInfo(companyName: string): Promise<T>;
}
