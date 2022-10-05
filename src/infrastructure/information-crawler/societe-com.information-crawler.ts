import { CompanyInformation } from '../../domain/company';
import {
  Crawler,
  ElementNotFoundError,
  ContentIsEmptyError,
  ExtractingContentFailure,
} from './information-crawler';

export class SocieteComCrawler extends Crawler {
  async extractCompanyInformations(
    key: string,
    selector: string,
    regexExtractor: RegExp,
  ): Promise<CompanyInformation> {
    await this.page.waitForSelector(selector);

    const element = await this.page.$(selector);
    if (element === null) {
      await this.closeBrowser();
      throw new ElementNotFoundError(
        `Selector ${selector} is not found on ${this.page.url} on societe.com crawler`,
      );
    }

    const rawData = await (
      await element.getProperty('textContent')
    ).jsonValue();
    if (rawData === null) {
      await this.closeBrowser();
      throw new ContentIsEmptyError(
        `No content for ${selector} on ${this.page.url} on societe.com crawler`,
      );
    }

    const content = rawData.match(regexExtractor);
    if (content === null) {
      await this.closeBrowser();
      throw new ExtractingContentFailure(
        `Regex ${regexExtractor} can't extract anything for ${rawData} on societe.com crawler`,
      );
    }

    return { [key]: content[0] };
  }
}
