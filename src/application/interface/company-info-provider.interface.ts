export type RawElement = { [key: string]: string };

export abstract class CompanyInfoProvider<CompanyInformation> {
  abstract getElementCompanyInfo(
    companyName: string,
  ): Promise<CompanyInformation>;
}
