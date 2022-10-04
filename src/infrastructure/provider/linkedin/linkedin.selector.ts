import {
  LinkedinSelector,
  SelectorReferential,
} from '../../../domain/model/selector.type';

// export const linkSel = new Selector<
//   typeof linkedinCompanyInformationDefinition
// >([
//   {
//     htmlMarkupAttribute: 'href',
//     location:
//       '#main-content > section > div > section > div > dl > div:nth-child(1) > dd > a',
//     property: 'website',
//   },
//   {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#main-content > section > div > section> div > dl > div:nth-child(2) > dd',
//     property: 'activitySector',
//   },

//   {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#main-content > section > div > section> div > dl > div:nth-child(3) > dd',
//     property: 'companySize',
//   },

//   {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#main-content > section > div > section> div > dl > div:nth-child(4) > dd',
//     property: 'headOfficeLocation',
//   },

//   {
//     htmlMarkupAttribute: 'innerText',
//     location:
//       '#main-content > section > section > div > div > div > ul > li > div > a',
//     property: 'employeeOnLinkedin',
//   },

//   {
//     htmlMarkupAttribute: 'src',
//     location: '#main-content > section > section > div > div > img',
//     property: 'logo',
//   },
// ]);

export const linkedinSelector: LinkedinSelector = {
  website: {
    htmlMarkupAttribute: 'href',
    location:
      '#main-content > section > div > section > div > dl > div:nth-child(1) > dd > a',
  },
  activitySector: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#main-content > section > div > section> div > dl > div:nth-child(2) > dd',
  },

  companySize: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#main-content > section > div > section> div > dl > div:nth-child(3) > dd',
  },

  headOfficeLocation: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#main-content > section > div > section> div > dl > div:nth-child(4) > dd',
  },

  employeeOnLinkedin: {
    htmlMarkupAttribute: 'innerText',
    location:
      '#main-content > section > section > div > div > div > ul > li > div > a',
  },

  logo: {
    htmlMarkupAttribute: 'src',
    location: '#main-content > section > section > div > div > img',
  },
};
