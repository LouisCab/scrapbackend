import { Injectable } from '@nestjs/common';

import { InformationReferential } from '../../application/information-referential';
import { InformationProvider } from '../../application/interface/information-provider/information-provider.interface';
import { constants } from '../../constants';
import { CompanyInformation } from '../../domain/company';
import { LinkedinInformationCrawler } from '../information-crawler/linkedin.information-crawler';
import { PuppeteerInformationExtractor } from './_information-extractor/_puppeteer.information-extractor';
import { PuppeteerInformationLocator } from './information-extractor/puppeter.information-extractor';

@Injectable()
export class LinkedinProvider extends InformationProvider<CompanyInformation> {
  constructor(
    // private readonly locator: PuppeteerInformationLocator,
    private readonly extractor: PuppeteerInformationExtractor,
    private readonly crawler: LinkedinInformationCrawler,
    private readonly referential: InformationReferential,
  ) {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    await this.crawler.initBrowser();
    await this.crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await this.crawler.consentCookies(constants.GOOGLE_CONSENT);
    await this.crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);

    const elements = await this.extractor.extractRawData();

    const companyInformations = await this.extractor.extractRawData(elements);

    await this.crawler.closeBrowser();

    return informations;
  }
}
