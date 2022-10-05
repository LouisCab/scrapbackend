import { InformationExtractor } from '../../../application/interface/information-extractor.interface';

export class LinkedinInformationExtractor implements InformationExtractor {
  transformRawData(locator: InformationReferential) {
    throw new Error('Method not implemented.');
  }
}
