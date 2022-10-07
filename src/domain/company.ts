import { societeComInformationReferential } from '../infrastructure/information-provider/information-referential/societe-com.information-referential';
import { linkedinInformationReferential } from '../infrastructure/information-provider/information-referential/linkedin.information-referential';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const mappingReferential = [
  ...societeComInformationReferential,
  ...linkedinInformationReferential,
];

type MappingReferential = Record<
  typeof mappingReferential[number]['property'],
  string
>;

export type CompanyInformation = Optional<
  MappingReferential,
  keyof MappingReferential
>;

export class Company {
  constructor(
    public readonly name: string,
    private informations: CompanyInformation = {},
  ) {}

  set setCompanyInformations(companyInformations: CompanyInformation) {
    this.informations = companyInformations;
  }
  get companyInformations() {
    return this.informations;
  }
  add(companyInformation: CompanyInformation) {
    this.informations = { ...this.informations, ...companyInformation };
  }
}
