import { CompanyInfoProvider } from '../../../application/interface/provider.interface';
import { SocieteComCrawler } from './societe-com.crawler';
import { constants } from '../../../constants';
import { societeComInformationLocator } from './societe-com.selector';
import { Injectable } from '@nestjs/common';
import { CompanyInformation } from '../../../domain/company';
import { Extractor } from '../../../application/information-extractor/information-extractor';
@Injectable()
export class SocieteComProvider extends CompanyInfoProvider<CompanyInformation> {
  constructor() {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    const crawler = new SocieteComCrawler();
    await crawler.initBrowser();
    await crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await crawler.consentCookies(constants.SOCIETE_COM_CONSENT);

    const extractor = new Extractor(crawler);
    const informations = await extractor.extractAndTransform(
      societeComInformationLocator,
    );

    await crawler.closeBrowser();

    return informations;
  }
}
