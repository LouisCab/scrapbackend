export abstract class InformationProvider<CompanyInformation> {
  abstract getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]>;
}
