import { SocieteComSelector, LinkedinSelector } from './selector.type';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type CompanyInformation = Optional<
  SocieteComSelector & LinkedinSelector,
  keyof SocieteComSelector | keyof LinkedinSelector
>;
export class Company {
  constructor(
    public readonly name: string,
    public informations: CompanyInformation,
  ) {}

  add(companyInformation: CompanyInformation) {
    this.informations = { ...this.informations, ...companyInformation };
  }

  // exists(companyInformation: CompanyInformation) {
  //   this.informations.keys.
  // }
}
