export type CompanyInformation = {
  [key: string]: string | number;
};
export type CompanyInformationMapping = {
  [key: keyof SocieteComSelector | keyof LinkedinSelector]: string | number;
};

export type SocieteComSelector = {
  creationDate: 'Date création entreprise';
  commercialName: 'Noms commerciaux';
  address: 'Adresse postale';
  sirenNumber: 'Numéro SIREN';
  siretNumber: 'Numéro SIRET (siège)';
  tvaCode: 'Numéro TVA Intracommunautaire';
  rcsCode: 'Numéro RCS';
  category: 'Catégorie';
  rcsStatus: 'Statut RCS';
  inseeStatus: 'Statut INSEE';
  rcsImmatriculationDate: "Date d'immatriculation RCS";
  inseeRegistrationDate: "Date d'enregistrement INSEE";
};

export type LinkedinSelector = {
  website: 'Site web';
  activitySector: 'Secteur';
  companySize: "Taille de l'entreprise";
  headOfficeLocation: 'Siège social';
  employeeOnLinkedin: '#main-content > section > section > div > div > div > ul > li > div > a';
  logo: '#main-content > section > section > div > div > img';
};

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
