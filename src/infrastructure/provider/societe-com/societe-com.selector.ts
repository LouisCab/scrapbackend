import { SocieteComSelector } from '../../../domain/model/selector.type';

export const societeComSelector: SocieteComSelector = {
  creationDate:
    '#rensjur > tbody > tr:nth-child(1) > td.flex.space-between.flex-wrap',
  commercialName: '#rensjur > tbody > tr:nth-child(3) > td.break-word',
  address: '#rensjur > tbody > tr:nth-child(5) > td:nth-child(2)',
  sirenNumber: '#siren_number > span',
  siretNumber: '#siret_number > span',
  tvaCode: '#tva_number > span',
  rcsCode: '#rensjur > tbody > tr:nth-child(10) > td.numdisplay',
  category: '#rensjur > tbody > tr:nth-child(12) > td:nth-child(2)',
  rcsStatus:
    '#rensjur > tbody > tr:nth-child(15) > td.flex.space-between.flex-wrap > div > span.TableTextGenerique > span',
  inseeStatus:
    '#rensjur > tbody > tr:nth-child(16) > td.flex.space-between.flex-wrap > div > span',
  rcsImmatriculationDate:
    '#rensjur > tbody > tr:nth-child(17) > td:nth-child(2)',
  inseeRegistrationDate:
    '#rensjur > tbody > tr:nth-child(18) > td:nth-child(2)',
};
