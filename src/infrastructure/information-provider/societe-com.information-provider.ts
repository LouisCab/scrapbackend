import { Injectable } from '@nestjs/common';
import { InformationProvider } from '../../application/interface/information-provider/information-provider.interface';
import { constants } from '../../constants';
import { CompanyInformation } from '../../domain/company';
import { SocieteComInformationCrawler } from '../information-crawler/societe-com.information-crawler';
import { PuppeteerInformationExtractor } from './information-extractor/puppeter.information-extractor';
import { societeComInformationReferential } from './information-referential/societe-com.information-referential';
import { PuppeteerInformationRefinery } from './information-refinery/puppeteer-information-refinery';

@Injectable()
export class SocieteComProvider extends InformationProvider<CompanyInformation> {
  constructor(
    private readonly extractor: PuppeteerInformationExtractor,
    private readonly transformer: PuppeteerInformationRefinery,
    private readonly crawler: SocieteComInformationCrawler,
  ) {
    super();
  }

  async getElementsCompanyInfomations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    await this.crawler.initBrowser();
    await this.crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await this.crawler.consentCookies(constants.GOOGLE_CONSENT);
    await this.crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await this.crawler.consentCookies(constants.SOCIETE_COM_CONSENT);

    const rawElements = await this.extractor.extractRawData(
      societeComInformationReferential,
    );

    const companyInformations = await this.transformer.transformRawData(
      rawElements,
    );

    await this.crawler.closeBrowser();

    return companyInformations;
  }
}
