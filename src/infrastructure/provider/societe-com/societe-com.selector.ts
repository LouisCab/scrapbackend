import { SocieteComSelector } from '../../../domain/model/selector.type';

export const societeComSelector: SocieteComSelector = {
  creationDate: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#rensjur > tbody > tr:nth-child(1) > td.flex.space-between.flex-wrap',
  },
  commercialName: {
    htmlMarkupAttribute: 'innerText',
    location: '#rensjur > tbody > tr:nth-child(3) > td.break-word',
  },
  address: {
    htmlMarkupAttribute: 'innerText',
    location: '#rensjur > tbody > tr:nth-child(5) > td:nth-child(2)',
  },
  sirenNumber: {
    htmlMarkupAttribute: 'innerText',
    location: '#siren_number > span',
  },
  siretNumber: {
    htmlMarkupAttribute: 'innerText',
    location: '#siret_number > span',
  },
  tvaCode: {
    htmlMarkupAttribute: 'innerText',
    location: '#tva_number > span',
  },
  rcsCode: {
    htmlMarkupAttribute: 'innerText',
    location: '#rensjur > tbody > tr:nth-child(10) > td.numdisplay',
  },
  category: {
    htmlMarkupAttribute: 'innerText',
    location: '#rensjur > tbody > tr:nth-child(12) > td:nth-child(2)',
  },
  rcsStatus: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#rensjur > tbody > tr:nth-child(15) > td.flex.space-between.flex-wrap > div > span.TableTextGenerique > span',
  },
  inseeStatus: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#rensjur > tbody > tr:nth-child(16) > td.flex.space-between.flex-wrap > div > span',
  },
  rcsImmatriculationDate: {
    htmlMarkupAttribute: 'innerText',
    location: '#rensjur > tbody > tr:nth-child(17) > td:nth-child(2)',
  },
  inseeRegistrationDate: {
    htmlMarkupAttribute: 'innerText',
    location: '#rensjur > tbody > tr:nth-child(18) > td:nth-child(2)',
  },
};
