import * as puppeteer from 'puppeteer';
import { CompanyInformation } from '../../domain/company';

export class InfrastructureError extends Error {
  constructor(message: string) {
    super(message);
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
export abstract class Crawler {
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
  constructor(page: puppeteer.Page) {
    this.page = page;
  }
  async goto(url: string) {
    await this.page.goto(url);
    // await this.page.waitForNavigation();
    if (this.page.url() != url) {
      throw new PageRedirectionFailed(url);
    }
  }
  async consentCookies(selector: string) {
    await this.page.waitForSelector(selector);
    console.log('SELECTOR WAITED');
    await this.page.click(selector);
  }

  async searchHasNoResult(): Promise<boolean> {
    const element = await this.page.$('#topstuff > div > div > p:nth-child(1)');
    if (element !== null) return true;
    return false;
  }
  async gotoFirstResult(selector: string) {
    if (await this.searchHasNoResult()) {
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
