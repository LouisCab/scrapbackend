import {
  InformationReferentialDefinition,
  InformationRubricDefinition,
} from '../../../application/information-referential';
import { InformationExtractor } from '../../../application/interface/information-provider/information-locator/information-extractor.interface';
import { CompanyInformation } from '../../../domain/company';
import { LinkedinInformationExtractor } from './information-extractor/linkedin.information-extractor';
import { InformationRubricValueDefinition } from './puppeter.information-locator';
export class LinkedinInformationLocator implements InformationExtractor {
  constructor();
  extractRawData(
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

      const value = await(
        await element.getProperty(referentialValue.htmlMarkupAttribute),
      ).jsonValue() as string;
      rubrics.push({ ...referentialValue, rawValue: value });
    }

    return rubrics;
  }
}
