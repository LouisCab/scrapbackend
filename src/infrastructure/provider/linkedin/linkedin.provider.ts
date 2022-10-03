import { CompanyInfoProvider } from '../../../application/interface/company-info-provider.interface';
import { constants } from '../../../constants';
import { LinkedinCrawler } from './linkedin.crawler';
import { Injectable } from '@nestjs/common';
import { CompanyInformation } from '../../../domain/company';
import { linkedinSelector as linkedinSelectors } from './linkedin.selector';

@Injectable()
export class LinkedinProvider extends CompanyInfoProvider<CompanyInformation> {
  constructor() {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation> {
    let elements: CompanyInformation = {};
    const promises: Promise<CompanyInformation>[] = [];

    const crawler = new LinkedinCrawler();
    await crawler.initBrowser();
    console.log(companyName);
    await crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);

    for (const [key, selector] of Object.entries(linkedinSelectors)) {
      promises.push(crawler.findExtractCompanyInformations(key, selector));
    }
    const elementsArray = await Promise.all(promises);

    for (const element of elementsArray) {
      elements = { ...elements, ...element };
    }

    await crawler.closeBrowser();

    return elements;
  }
}
