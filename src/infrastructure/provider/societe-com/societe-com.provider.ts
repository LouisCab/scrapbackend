import {
  CompanyInfoProvider,
  RawElement,
} from '../../../application/interface/company-info-provider.interface';
import { Browser } from '../../browser/puppeteer-browser';
import { SocieteComCrawler } from './societe-com.crawler';
import { constants } from '../../../constants';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SocieteComProvider extends CompanyInfoProvider<RawElement[]> {
  constructor() {
    super();
  }

  async getElementCompanyInfo(companyName: string): Promise<RawElement[]> {
    const browser = new Browser();
    await browser.initBrowser();

    const crawler = new SocieteComCrawler(browser.puppeteerPage);
    await crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await crawler.consentCookies(constants.SOCIETE_COM_CONSENT);
    const elements = await crawler.getRawElement(
      constants.SOCIETE_COM_SELECTOR,
    );

    await browser.closeBrowser();

    return elements;
  }
}
