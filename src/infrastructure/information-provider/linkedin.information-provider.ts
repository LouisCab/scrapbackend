import { InformationProvider } from '../../../application/interface/information-provider.interface';
import { constants } from '../../../constants';
import { LinkedinCrawler } from './linkedin.crawler';
import { Injectable } from '@nestjs/common';
import { CompanyInformation } from '../../../domain/company';
import { linkedinSelector } from '../../information-selector/linkedin.information-selector';
import { Extractor } from '../../../domain/information-extractor';

@Injectable()
export class LinkedinProvider extends InformationProvider<CompanyInformation> {
  constructor() {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    const crawler = new LinkedinCrawler();
    await crawler.initBrowser();
    await crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);

    const extractor = new Extractor(crawler);
    const informations = await extractor.extractAndTransform(linkedinSelector);

    await crawler.closeBrowser();

    return informations;
  }
}
