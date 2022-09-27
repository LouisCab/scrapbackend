import { Browser } from '../browser';
import { Crawler } from '../crawler';
export class SocieteComCrawler {
  constructor(private companyName: string) {}

  async loadContent(): Promise<string> {
    const browser = new Browser();
    await browser.initBrowser();
    const crawler = new Crawler(browser.puppeteerPage);

    await crawler.goto(
      'https://www.google.com/search?q=site%3Asociete.com+' + this.companyName,
    );
    await crawler.consentCookies('#L2AGLb'); // google consent
    await crawler.gotoFirstResult();
    await browser.delay(2000);
    await crawler.consentCookies('#didomi-notice-agree-button'); // societe.com consent

    const element = await crawler.getHtmlElement('#rensjur'); //'table.rensjur';

    await browser.closeBrowser();

    return element;
  }
}
