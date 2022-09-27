import * as puppeteer from 'puppeteer';

export class Browser {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;
  get puppeteerPage() {
    return this.page;
  }
  set setPuppeteerPage(page: puppeteer.Page) {
    this.page = page;
  }

  async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
    });
    this.setPuppeteerPage = await this.browser.newPage();
  }

  async delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async closeBrowser() {
    await this.browser.close();
  }
}
