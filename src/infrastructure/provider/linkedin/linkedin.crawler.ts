import * as puppeteer from 'puppeteer';
import { CompanyInformation } from '../../../domain/company';
import {
  ContentIsEmptyError,
  Crawler,
  ElementNotFoundError,
  ExtractingContentFailure,
} from '../crawler';

export class LinkedinCrawler extends Crawler {
  constructor(page: puppeteer.Page) {
    super(page);
    this.page = page;
  }

  async extractCompanyInformations(
    key: string,
    selector: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation> {
    await this.page.waitForSelector(selector);

    const element = await this.page.$(selector);
    if (element === null) {
      throw new ElementNotFoundError(
        `Selector ${selector} is not found on ${this.page.url} on linkedin crawler`,
      );
    }

    const rawData = await (
      await element.getProperty('textContent')
    ).jsonValue();
    if (rawData === null) {
      throw new ContentIsEmptyError(
        `No content for ${selector} on ${this.page.url} on linkedin crawler`,
      );
    }

    const content = rawData.match(regexExtractor);
    if (content === null) {
      throw new ExtractingContentFailure(
        `Regex ${regexExtractor} can't extract anything for ${rawData} on linkedin crawler`,
      );
    }

    return { [key]: content[0] };
  }
}
