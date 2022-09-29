import {
  CompanyInfoProvider,
  RawElement,
} from '../../../application/interface/company-info-provider.interface';
import { Browser } from '../../browser/puppeteer-browser';
import { constants } from '../../../constants';
import { LinkedinCrawler } from './linkedin.crawler';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LinkedinProvider extends CompanyInfoProvider<RawElement[]> {
  constructor() {
    super();
  }

  async getElementCompanyInfo(companyName: string): Promise<RawElement[]> {
    const browser = new Browser();
    await browser.initBrowser();

    const crawler = new LinkedinCrawler(browser.puppeteerPage);
    await crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    const elements = await crawler.getRawElement(constants.LINKEDIN_SELECTOR);

    await browser.closeBrowser();

    return elements;
  }
}
