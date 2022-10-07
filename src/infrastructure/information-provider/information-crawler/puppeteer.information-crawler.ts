import * as puppeteer from 'puppeteer';
import { CompanyInformation } from '../../../domain/company';
import { InformationCrawler } from '../../../application/interface/information-provider/information-crawler/information-crawler.abstract';

export class InfrastructureError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class NoBrowserDefined extends InfrastructureError {
  constructor() {
    super('There is no browser launched');
  }
}

export class NoPageOpened extends InfrastructureError {
  constructor() {
    super("Browser can't open new page");
  }
}

export class BrowserNotClosedProperly extends InfrastructureError {
  constructor() {
    super('Browser is not closed properly');
  }
}

export class PageRedirectionFailed extends InfrastructureError {
  constructor(url: string) {
    super(`Failed to redirect to ${url}`);
  }
}

export class NoResultForInput extends InfrastructureError {
  constructor() {
    super(`Specified search string has no result avalaible`);
  }
}

export class CookiesAcceptanceFailed extends InfrastructureError {
  constructor(selector: string) {
    super(`Failed to accept cookies for ${selector}, hint : maybe add a delay`);
  }
}

export class ElementNotFoundError extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}

export class ContentIsEmptyError extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}

export class ExtractingContentFailure extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}
export abstract class PuppeteerInformationCrawler extends InformationCrawler {
  private browser: puppeteer.Browser;
  protected page: puppeteer.Page;
  private elements: Promise<string>;

  get puppeteerPage() {
    return this.page;
  }

  get puppeteerElement() {
    return this.elements;
  }

  set setPuppeteerElement(elements: Promise<string>) {
    this.elements = elements;
  }

  set setPuppeteerPage(page: puppeteer.Page) {
    this.page = page;
  }

  async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
    });
    if (!this.browser) {
      throw new NoBrowserDefined();
    }
    // TODO set user agent for headless
    // this.setPuppeteerPage = await this.browser.newPage();
    const puppeteerPage = await this.browser.newPage();
    // await puppeteerPage.setCacheEnabled(false);
    this.setPuppeteerPage = puppeteerPage;
    await this.page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    );
    if (!this.puppeteerPage) {
      await this.browser.close();
      throw new NoPageOpened();
    }
  }

  async closeBrowser() {
    await this.browser.close();
    if (this.browser.isConnected()) {
      await this.browser.close();
      throw new BrowserNotClosedProperly();
    }
  }
  async goto(url: string) {
    await this.page.goto(url);
    if (this.page.url() != url) {
      await this.browser.close();
      throw new PageRedirectionFailed(url);
    }
  }
  async consentCookies(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async searchHasNoResult(): Promise<boolean> {
    const element = await this.page.$('#topstuff > div > div > p:nth-child(1)');

    if (element !== null) {
      return true;
    }
    return false;
  }
  async gotoFirstResult(selector: string) {
    if (await this.searchHasNoResult()) {
      await this.browser.close();
      throw new NoResultForInput();
    }
    await this.page.click(selector);
  }
  abstract extractCompanyInformations(
    key: string,
    identifier: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation>;
}
