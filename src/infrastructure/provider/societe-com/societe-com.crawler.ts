import * as puppeteer from 'puppeteer';
import { CompanyInformation } from '../../../../dist/domain/model/company';
import { RawElement } from '../../../application/interface/company-info-provider.interface';
import { Crawler } from '../crawler';

export class InfrastructureError extends Error {
  constructor(message: string) {
    super(message);
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
export class SocieteComCrawler extends Crawler {
  constructor(page: puppeteer.Page) {
    super(page);
    this.page = page;
  }

  async getRawElement(
    key: string,
    selector: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation> {
    await this.page.waitForSelector(selector);

    const element = await this.page.$(selector);
    if (element === null) {
      throw new ElementNotFoundError(
        `Selector ${selector} is not found on ${this.page.url}`,
      );
    }

    const rawData = await (
      await element.getProperty('textContent')
    ).jsonValue();
    if (rawData === null) {
      throw new ContentIsEmptyError(
        `No content for ${selector} on ${this.page.url}`,
      );
    }
    const content = rawData.match(regexExtractor);
    if (content === null) {
      throw new ExtractingContentFailure(
        `Regex ${regexExtractor} can't extract anything for ${rawData}`,
      );
    }

    return { [key]: content[0] };
  }
}
