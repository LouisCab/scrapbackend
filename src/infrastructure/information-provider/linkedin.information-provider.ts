import { Injectable } from '@nestjs/common';
import { InformationReferential } from '../../application/information-referential';
import { InformationProvider } from '../../application/interface/information-provider/information-provider.interface';
import { constants } from '../../constants';
import { CompanyInformation } from '../../domain/company';
import { LinkedinInformationCrawler } from '../information-crawler/linkedin.information-crawler';
import { PuppeteerInformationExtractor } from './information-extractor/puppeter.information-extractor';
import { PuppeteerInformationRefinery } from './information-refinery/puppeteer-information-refinery';

@Injectable()
export class LinkedinProvider extends InformationProvider<CompanyInformation> {
  constructor(
    private readonly extractor: PuppeteerInformationExtractor,
    private readonly transformer: PuppeteerInformationRefinery,
    private readonly crawler: LinkedinInformationCrawler,
    private readonly referential: InformationReferential,
  ) {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation> {
    await this.crawler.initBrowser();
    await this.crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await this.crawler.consentCookies(constants.GOOGLE_CONSENT);
    await this.crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);

    const rawElements = await this.extractor.extractRawData(
      this.referential.informationRubrics,
    );

    const companyInformations = await this.transformer.transformRawData(
      rawElements,
    );

    await this.crawler.closeBrowser();

    return companyInformations;
  }
}
