import * as puppeteer from 'puppeteer';
export class Crawler {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;

  get puppeteerPage() {
    return this.page;
  }

  set setPuppeteerPage(page: puppeteer.Page) {
    this.page = page;
  }
  async initPage() {
    this.browser = await puppeteer.launch({
      headless: false,
    });
    this.setPuppeteerPage = await this.browser.newPage();
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async consentCookies(selector: string) {
    await this.page.click(selector);
  }

  async gotoFirstResult() {
    await this.page.click(
      '#rso > div:nth-child(1) > div > div > div > div > a',
    );
  }

  async closeBrowser() {
    await this.browser.close();
  }
}
