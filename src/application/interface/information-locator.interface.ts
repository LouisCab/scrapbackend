export interface InformationLocator<
  R extends InformationReferential = InformationReferential,
> {
  transformRawData(
    locator: InformationLocatorDefinition<R>,
    value: string,
  ): CompanyInformation;

  extractRawData(
    locator: InformationLocatorDefinition<R>,
  ): Promise<CompanyInformation>;
  extractAndTransform(): CompanyInformation;
}
