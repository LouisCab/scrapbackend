export type InformationRubricDefinition = {
  htmlMarkupAttribute: string;
  selector: string;
  property: string;
  extractMethod?: RegExp;
};

export interface InformationRubricValue extends InformationRubricDefinition {
  rawValue: string;
}

export type InformationRubricValueDefinition = InformationRubricValue[];

export type InformationReferentialDefinition = Readonly<
  InformationRubricDefinition[]
>;

export interface InformationExtractor {
  extractRawData(
    locator: InformationReferentialDefinition,
  ): Promise<InformationRubricValueDefinition>;
}
