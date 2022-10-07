import {
  InformationExtractor,
  InformationReferentialDefinition,
  InformationRubricValueDefinition,
} from '../../../application/interface/information-provider/information-extractor/information-extractor.interface';
import { PuppeteerInformationCrawler } from '../information-crawler/puppeteer.information-crawler';

export class PuppeteerInformationExtractor implements InformationExtractor {
  constructor(private readonly crawler: PuppeteerInformationCrawler) {}
  async extractRawData(
    referentialValues: InformationReferentialDefinition,
  ): Promise<InformationRubricValueDefinition> {
    const rubrics: InformationRubricValueDefinition = [];

    for (const referentialValue of referentialValues) {
      await this.crawler.puppeteerPage.waitForSelector(
        referentialValue.selector,
      );
      const element = await this.crawler.puppeteerPage.$(
        referentialValue.selector,
      );

      if (element === null) {
        throw new Error('fucked up');
      }

      const value = (await (
        await element.getProperty(referentialValue.htmlMarkupAttribute)
      ).jsonValue()) as string;
      rubrics.push({ ...referentialValue, rawValue: value });
    }

    return rubrics;
  }
}
