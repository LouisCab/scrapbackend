export type InformationRubricDefinition = {
  htmlMarkupAttribute: string;
  selector: string;
  property: string;
};

export type InformationReferentialDefinition = Readonly<
  InformationRubricDefinition[]
>;

export class InformationReferential<
  InformationReferentialDefinitions extends InformationReferentialDefinition = InformationReferentialDefinition,
> {
  constructor(
    private readonly information: InformationReferentialDefinitions,
  ) {}
  get informationRubrics() {
    return this.information;
  }
}
