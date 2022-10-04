import { CompanyInformation } from '../../domain/company';
import { InformationLocator } from '../information-locator';
import {
  ImageSelector,
  Selectors,
  TextSelector,
} from '../../domain/model/selector.type';
import { Crawler } from '../../infrastructure/provider/crawler';

type RawData = {
  key: string;
  value: string;
  markupHtml: string;
};
export class Extractor {
  constructor(private readonly crawler: Crawler) {}

  async extractRawData(
    key: string,
    selector: TextSelector | ImageSelector,
  ): Promise<RawData> {
    await this.crawler.puppeteerPage.waitForSelector(selector.location);

    const element = await this.crawler.puppeteerPage.$(selector.location);

    if (element === null) {
      throw new Error('fucked up');
    }

    const value = (await (
      await element.getProperty(selector.htmlMarkupAttribute)
    ).jsonValue()) as string;

    return { key, value, markupHtml: selector.htmlMarkupAttribute };
  }

  transformRawData(rawData: RawData): CompanyInformation {
    const regex = new RegExp(/(([\d-])+\s?|([A-zÀ-ú,']+\s|\w+))+(?<!\n)/g);
    let content: RegExpMatchArray | null;

    switch (rawData.markupHtml) {
      case 'innerText':
        content = rawData.value.match(regex);
        break;
      case 'src':
        content = [rawData.value];
        break;
      case 'href':
        content = [rawData.value];
        break;
      default:
        content = null;
        break;
    }

    if (content === null) {
      throw new Error('yéyé');
    }
    return { [rawData.key]: content[0] };
  }

  async extractAndTransform(
    locators: InformationLocator,
  ): Promise<CompanyInformation[]> {
    const informations: CompanyInformation[] = [];

    for (const locator in locators) {
      locator.
      const rawData: RawData = await this.extractRawData(key, selector);
      informations.push(this.transformRawData(rawData));
    }

    await this.crawler.closeBrowser();
    return informations;
  }
}
