type InformationReferentialValueDefinition = string;
type InformationReferentialDefinition = Readonly<
  InformationReferentialValueDefinition[]
>;

export type InformationReferentialElement<
  R extends InformationReferential = InformationReferential,
> = R extends InformationReferential<infer U>
  ? U extends Readonly<Array<infer V>>
    ? V
    : never
  : never;

export class InformationReferential<
  InformationReferentialDefinitions extends InformationReferentialDefinition = InformationReferentialDefinition,
> {
  constructor(
    private readonly companyInformations: InformationReferentialDefinitions,
  ) {}
}
