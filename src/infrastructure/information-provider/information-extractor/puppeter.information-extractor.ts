import {
  InformationReferentialDefinition,
  InformationRubricDefinition,
} from '../../../application/information-referential';
import { InformationExtractor } from '../../../application/interface/information-provider/information-locator/information-extractor.interface';
import { InformationCrawler } from '../../information-crawler/information-crawler';

interface InformationRubricValue extends InformationRubricDefinition {
  rawValue: string;
}

export type InformationRubricValueDefinition = InformationRubricValue[];

export class PuppeteerInformationExtractor implements InformationExtractor {
  constructor(private readonly crawler: InformationCrawler) {}
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
