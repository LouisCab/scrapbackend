export type Selectors = LinkedinSelector | SocieteComSelector;

export type SocieteComSelector = {
  creationDate: TextSelector;
  commercialName: TextSelector;
  address: TextSelector;
  sirenNumber: TextSelector;
  siretNumber: TextSelector;
  tvaCode: TextSelector;
  rcsCode: TextSelector;
  category: TextSelector;
  rcsStatus: TextSelector;
  inseeStatus: TextSelector;
  rcsImmatriculationDate: TextSelector;
  inseeRegistrationDate: TextSelector;
};

export type LinkedinSelector = {
  website: TextSelector;
  activitySector: TextSelector;
  companySize: TextSelector;
  headOfficeLocation: TextSelector;
  employeeOnLinkedin: TextSelector;
  logo: ImageSelector;
};

export type ImageSelector = {
  htmlMarkupAttribute: string;
  location: string;
};

export type TextSelector = {
  htmlMarkupAttribute: string;
  location: string;
};
