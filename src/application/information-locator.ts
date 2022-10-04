import { Crawler } from '../infrastructure/provider/crawler';
import { Company, CompanyInformation } from '../domain/company';
import {
  InformationReferential,
  InformationReferentialElement,
} from './information-referential';
import { CompanyInfoProvider } from './interface/provider.interface';

interface Base {
  selector: string;
}

interface InformationLocatorValueDefinition<
  R extends InformationReferential = InformationReferential,
> extends Base {
  htmlMarkupAttribute: string;
  property: InformationReferentialElement<R>;
  //   location: string;
}
export type InformationLocatorDefinition<
  R extends InformationReferential = InformationReferential,
> = InformationLocatorValueDefinition<R>;

export class InformationLocator<
  R extends InformationReferential = InformationReferential,
> {
  constructor(private locators: InformationLocatorDefinition<R>[]) {}

  transformRawData(
    locator: InformationLocatorDefinition<R>,
    value: string,
  ): CompanyInformation {
    const regex = new RegExp(/(([\d-])+\s?|([A-zÀ-ú,']+\s|\w+))+(?<!\n)/g);
    let content: RegExpMatchArray | null;

    switch (locator.htmlMarkupAttribute) {
      case 'innerText':
        content = value.match(regex);
        break;
      case 'src':
        content = [value];
        break;
      case 'href':
        content = [value];
        break;
      default:
        content = null;
        break;
    }

    if (content === null) {
      throw new Error('yéyé');
    }
    return { [locator.property]: content[0] };
  }

  async extractRawData(
    locator: InformationLocatorDefinition<R>,
  ): Promise<CompanyInformation> {
    await this.crawler.puppeteerPage.waitForSelector(locator.selector);

    const element = await this.crawler.puppeteerPage.$(locator.selector);

    if (element === null) {
      throw new Error('fucked up');
    }

    const value = (await (
      await element.getProperty(locator.htmlMarkupAttribute)
    ).jsonValue()) as string;

    const companyInformation = this.transformRawData(locator, value);

    return companyInformation;
  }

  async extractAndTransform() {
    const informations: CompanyInformation[] = [];

    for (const locator of this.locators) {
      const companyInformation = await this.extractRawData(locator);
      informations.push(companyInformation);
    }

    await this.crawler.closeBrowser();
    return informations;
  }
}
