import * as puppeteer from 'puppeteer';
import { Crawler } from '../crawler';
export class SocieteComScrapper {
  constructor(private companyName: string) {}

  async loadContent(): Promise<puppeteer.Page> {
    const crawler = new Crawler();
    crawler.initPage();
    crawler.goto(
      'https://www.google.com/search?q=site%3Asociete.com+' + this.companyName,
    );
    crawler.consentCookies('#L2AGLb'); // google consent
    crawler.consentCookies('#didomi-notice-agree-button'); // societe.com consent
    crawler.gotoFirstResult();
    const page = crawler.puppeteerPage;
    crawler.closeBrowser();

    return page;
  }
}
