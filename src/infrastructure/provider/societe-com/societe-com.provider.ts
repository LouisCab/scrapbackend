import { CompanyInfoProvider } from '../../../application/interface/company-info-provider.interface';
import { SocieteComCrawler } from './societe-com.crawler';
import { constants } from '../../../constants';
import { societeComSelector } from './societe-com.selector';
import { Injectable } from '@nestjs/common';
import { CompanyInformation } from '../../../domain/company';
@Injectable()
export class SocieteComProvider extends CompanyInfoProvider<CompanyInformation> {
  constructor() {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation> {
    let elements: CompanyInformation = {};
    const promises: Promise<CompanyInformation>[] = [];
    const regex = new RegExp(/(([\d-])+\s?|([A-zÀ-ú,']+\s|\w+))+(?<!\n)/g);

    const crawler = new SocieteComCrawler();
    await crawler.initBrowser();
    await crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await crawler.consentCookies(constants.SOCIETE_COM_CONSENT);

    for (const [key, value] of Object.entries(societeComSelector)) {
      promises.push(crawler.findExtractCompanyInformations(key, value, regex));
    }

    const elementsArray = await Promise.all(promises);

    for (const element of elementsArray) {
      elements = { ...elements, ...element };
    }

    await crawler.closeBrowser();

    return elements;
  }
}
