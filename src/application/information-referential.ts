type InformationRubricDefinition = string;

type InformationReferentialDefinition = Readonly<InformationRubricDefinition[]>;

export class InformationReferential<
  InformationReferentialDefinitions extends InformationReferentialDefinition = InformationReferentialDefinition,
> {
  constructor(
    private readonly informationRubrics: InformationReferentialDefinitions,
  ) {}
}
