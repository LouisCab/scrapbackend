export type SocieteComSelector = {
  creationDate: string;
  commercialName: string;
  address: string;
  sirenNumber: string;
  siretNumber: string;
  tvaCode: string;
  rcsCode: string;
  category: string;
  rcsStatus: string;
  inseeStatus: string;
  rcsImmatriculationDate: string;
  inseeRegistrationDate: string;
};

export type LinkedinSelector = {
  website: string;
  activitySector: string;
  companySize: string;
  headOfficeLocation: string;
  employeeOnLinkedin: string;
  logo: string;
};

// export type SocieteComSelector = {
//   creationDate: 'Date création entreprise';
//   commercialName: 'Noms commerciaux';
//   address: 'Adresse postale';
//   sirenNumber: 'Numéro SIREN';
//   siretNumber: 'Numéro SIRET (siège)';
//   tvaCode: 'Numéro TVA Intracommunautaire';
//   rcsCode: 'Numéro RCS';
//   category: 'Catégorie';
//   rcsStatus: 'Statut RCS';
//   inseeStatus: 'Statut INSEE';
//   rcsImmatriculationDate: "Date d'immatriculation RCS";
//   inseeRegistrationDate: "Date d'enregistrement INSEE";
// };

// export type LinkedinSelector = {
//   website: 'Site web';
//   activitySector: 'Secteur';
//   companySize: "Taille de l'entreprise";
//   headOfficeLocation: 'Siège social';
//   employeeOnLinkedin: '#main-content > section > section > div > div > div > ul > li > div > a';
//   logo: '#main-content > section > section > div > div > img';
// };
