import { SocieteComSelector, LinkedinSelector } from './model/selector.type';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type CompanyInformation = Optional<
  SocieteComSelector & LinkedinSelector,
  keyof SocieteComSelector | keyof LinkedinSelector
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

  exists(companyInformation: keyof CompanyInformation) {
    if (
      this.informations[companyInformation] &&
      this.informations[companyInformation] !== null
    ) {
      console.warn(
        `${String(companyInformation)} already exists in ${
          this.name
        } informations`,
      );
      return true;
    }
    return false;
  }
}
