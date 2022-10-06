export type Selectors = LinkedinSelector | SocieteComSelector;

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
