import { LinkedinSelector } from '../../../domain/model/selector.type';

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
