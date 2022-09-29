import * as puppeteer from 'puppeteer';
import { Crawler, RawElement } from '../provider';

export class LinkedinCrawler extends Crawler {
  constructor(page: puppeteer.Page) {
    super(page);
    this.page = page;
  }

  async getRawElement(selector: string): Promise<RawElement[]> {
    await this.page.waitForSelector(selector);
    const rawData = await this.page.$$eval(
      selector,
      (elems: HTMLTableCellElement[]) =>
        elems.map((elem) => {
          return elem.innerText;
        }),
    );

    return rawData;
  }
}
