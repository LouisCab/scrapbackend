import { CompanyInfoProvider } from '../../../application/interface/company-info-crawler.interface';
import { RawElement } from '../../../application/interface/crawler.interface';
import { Browser } from '../../browser/puppeteer-browser';
import { SocieteComCrawler } from './societe-com.crawler';
import { constants } from '../../../constants';

export class SocieteComProvider extends CompanyInfoProvider<RawElement[]> {
  constructor(private companyName: string) {
    super();
  }

  async getElementCompanyInfo(): Promise<RawElement[]> {
    const browser = new Browser();
    await browser.initBrowser();

    const crawler = new SocieteComCrawler(browser.puppeteerPage);
    await crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + this.companyName);
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
