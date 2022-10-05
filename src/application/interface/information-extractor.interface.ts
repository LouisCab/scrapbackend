export interface InformationExtractor {
  transformRawData(
    locator: InformationLocatorDefinition<R>,
    value: string,
  ): CompanyInformation;
}
