import * as puppeteer from 'puppeteer';
import { RawElement } from '../../../application/interface/company-info-provider.interface';
import { Crawler } from '../crawler';

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
