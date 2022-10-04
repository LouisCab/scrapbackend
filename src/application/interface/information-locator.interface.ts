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

export interface InformationLocator<
  R extends InformationReferential = InformationReferential,
> {
  transformRawData(
    locator: InformationLocatorDefinition<R>,
    value: string,
  ): CompanyInformation;

  extractRawData(
    locator: InformationLocatorDefinition<R>,
  ): Promise<CompanyInformation>;
  extractAndTransform(): CompanyInformation;
}
