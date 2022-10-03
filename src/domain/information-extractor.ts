import { CompanyInformation } from './company';
import { ImageSelector, Selectors, TextSelector } from './model/selector.type';
import { Crawler } from '../infrastructure/provider/crawler';

type RawData = {
  key: string;
  value: string;
  markupHtml: string;
};
export class Extractor {
  private crawler: Crawler;
  constructor(crawler: Crawler) {
    this.crawler = crawler;
  }

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
    selectors: Selectors,
  ): Promise<CompanyInformation[]> {
    const informations: CompanyInformation[] = [];

    for (const [key, selector] of Object.entries(selectors)) {
      const rawData: RawData = await this.extractRawData(key, selector);
      informations.push(this.transformRawData(rawData));
    }

    await this.crawler.closeBrowser();
    return informations;
  }
}
