// import { SocieteComSelector } from '../../domain/model/selector.type';

// export const societeComSelector: SocieteComSelector = {
//   creationDate: {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#rensjur > tbody > tr:nth-child(1) > td.flex.space-between.flex-wrap',
//   },
//   commercialName: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#rensjur > tbody > tr:nth-child(3) > td.break-word',
//   },
//   address: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#rensjur > tbody > tr:nth-child(5) > td:nth-child(2)',
//   },
//   sirenNumber: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#siren_number > span',
//   },
//   siretNumber: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#siret_number > span',
//   },
//   tvaCode: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#tva_number > span',
//   },
//   rcsCode: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#rensjur > tbody > tr:nth-child(10) > td.numdisplay',
//   },
//   category: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#rensjur > tbody > tr:nth-child(12) > td:nth-child(2)',
//   },
//   rcsStatus: {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#rensjur > tbody > tr:nth-child(15) > td.flex.space-between.flex-wrap > div > span.TableTextGenerique > span',
//   },
//   inseeStatus: {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#rensjur > tbody > tr:nth-child(16) > td.flex.space-between.flex-wrap > div > span',
//   },
//   rcsImmatriculationDate: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#rensjur > tbody > tr:nth-child(17) > td:nth-child(2)',
//   },
//   inseeRegistrationDate: {
//     htmlMarkupAttribute: 'innerText',
//     location: '#rensjur > tbody > tr:nth-child(18) > td:nth-child(2)',
//   },
// };

export const societeComInformationLocator = new InformationLocator([
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#rensjur > tbody > tr:nth-child(1) > td.flex.space-between.flex-wrap',
    property: 'creationDate',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(3) > td.break-word',
    property: 'commercialName',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(5) > td:nth-child(2)',
    property: 'address',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#siren_number > span',
    property: 'sirenNumber',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#siret_number > span',
    property: 'siretNumber',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#tva_number > span',
    property: 'tvaCode',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(10) > td.numdisplay',
    property: 'rcsCode',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(12) > td:nth-child(2)',
    property: 'category',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#rensjur > tbody > tr:nth-child(15) > td.flex.space-between.flex-wrap > div > span.TableTextGenerique > span',
    property: 'rcsStatus',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#rensjur > tbody > tr:nth-child(16) > td.flex.space-between.flex-wrap > div > span',
    property: 'inseeStatus',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(17) > td:nth-child(2)',
    property: 'rcsImmatriculationDate',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(18) > td:nth-child(2)',
    property: 'inseeRegistrationDate',
  },
]);
