import * as puppeteer from 'puppeteer';

export class NoBrowserDefined extends Error {
  constructor() {
    super('There is no browser launched');
  }
}

export class NoPageOpened extends Error {
  constructor() {
    super("Browser can't open new page");
  }
}

export class BrowserNotClosedProperly extends Error {
  constructor() {
    super('Browser is not closed properly');
  }
}

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
    if (!this.browser) {
      throw new NoBrowserDefined();
    }
    this.setPuppeteerPage = await this.browser.newPage();
    if (!this.puppeteerPage) {
      throw new NoPageOpened();
    }
  }

  async closeBrowser() {
    await this.browser.close();
    if (this.browser.isConnected()) {
      throw new BrowserNotClosedProperly();
    }
  }
}
