import * as puppeteer from 'puppeteer';
export type RawElement = string;

export class PageRedirectionFailed extends Error {
  constructor(url: string) {
    super(`Failed to redirect to ${url}`);
  }
}

export class CookiesAcceptanceFailed extends Error {
  constructor(selector: string) {
    super(`Failed to accept cookies for ${selector}, hint : maybe add a delay`);
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
    if (this.page.url() != url) {
      throw new PageRedirectionFailed(url);
    }
  }
  async consentCookies(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
  async gotoFirstResult(selector: string) {
    await this.page.click(selector);
  }
  abstract getRawElement(identifier: string): Promise<RawElement[]>;
}
