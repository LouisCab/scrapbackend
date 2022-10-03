import { CompanyInfoProvider } from '../../../application/interface/company-info-provider.interface';
import { Browser } from '../../browser/puppeteer-browser';
import { constants } from '../../../constants';
import { LinkedinCrawler } from './linkedin.crawler';
import { Injectable } from '@nestjs/common';
import { CompanyInformation } from '../../../domain/company';
@Injectable()
export class LinkedinProvider extends CompanyInfoProvider<CompanyInformation> {
  constructor() {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation> {
    const browser = new Browser();
    await browser.initBrowser();

    const crawler = new LinkedinCrawler(browser.puppeteerPage);
    await crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    // const elements = await crawler.extractCompanyInformations(
    //   constants.LINKEDIN_SELECTOR,
    // );
    const elements = { logo: 'testito' };
    await browser.closeBrowser();

    return elements;
  }
}
