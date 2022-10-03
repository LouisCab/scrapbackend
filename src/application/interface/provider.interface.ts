// export type RawElement = { [key: string]: string };

export abstract class CompanyInfoProvider<CompanyInformation> {
  abstract getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]>;
}
