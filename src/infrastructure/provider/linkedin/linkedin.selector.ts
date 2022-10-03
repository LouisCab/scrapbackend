import { LinkedinSelectors } from '../../../domain/model/selector.type';

export const linkedinSelector: LinkedinSelectors = {
  website: {
    htmlMarkupToScrap: 'innerText',
    location:
      '#main-content > section > div > section > div > dl > div:nth-child(1) > dd > a',
  },
  activitySector: {
    htmlMarkupToScrap: 'innerText',
    location:
      '#main-content > section > div > section> div > dl > div:nth-child(2) > dd',
  },

  companySize: {
    htmlMarkupToScrap: 'innerText',
    location:
      '#main-content > section > div > section> div > dl > div:nth-child(3) > dd',
  },

  headOfficeLocation: {
    htmlMarkupToScrap: 'innerText',
    location:
      '#main-content > section > div > section> div > dl > div:nth-child(4) > dd',
  },

  employeeOnLinkedin: {
    htmlMarkupToScrap: 'innerText',
    location:
      '#main-content > section > section > div > div > div > ul > li > div > a',
  },

  logo: {
    htmlMarkupToScrap: 'src',
    location: '#main-content > section > section > div > div > img',
  },
};
