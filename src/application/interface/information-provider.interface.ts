// export type RawElement = { [key: string]: string };

export abstract class InformationProvider<CompanyInformation> {
  abstract getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]>;
}
