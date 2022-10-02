import {
  CompanyInfoProvider,
  RawElement,
} from '../../../application/interface/company-info-provider.interface';
import { Browser } from '../../browser/puppeteer-browser';
import { SocieteComCrawler } from './societe-com.crawler';
import { constants } from '../../../constants';
import { societeComSelector } from './societe-com.selector';
import { Injectable } from '@nestjs/common';
import { Company, CompanyInformation } from '../../../domain/model/company';
@Injectable()
export class SocieteComProvider extends CompanyInfoProvider<CompanyInformation> {
  constructor() {
    super();
  }

  async getElementCompanyInfo(
    companyName: string,
  ): Promise<CompanyInformation> {
    const company = new Company(companyName, {});
    const promises: Promise<CompanyInformation>[] = [];
    const regex = new RegExp(/\b(?<![\\n])([A-zÀ-ú]+|\s|\d+|-)+/);

    const browser = new Browser();
    await browser.initBrowser();

    const crawler = new SocieteComCrawler(browser.puppeteerPage);
    await crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await crawler.consentCookies(constants.SOCIETE_COM_CONSENT);
    for (const [key, value] of Object.entries(societeComSelector)) {
      promises.push(crawler.getRawElement(key, value, regex));
    }

    const elements = await Promise.all(promises);
    let key: keyof CompanyInformation;
    for (const element in elements) {
      [key] = Object.keys(element) as Array<keyof CompanyInformation>;
      if (!company.exists(key)) {
        company.add(element);
      }
    }

    await browser.closeBrowser();

    return company;
  }
}
