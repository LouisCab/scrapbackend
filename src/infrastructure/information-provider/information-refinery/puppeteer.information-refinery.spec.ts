// htmlMarkupAttribute: string;
// selector: string;
// property: string;
// rawValue: string;

import { InformationRefinery } from '../../../application/interface/information-provider/information-refinery/information-refinery.interface';
import { FakeInformationRefinery } from './fake.information-refinery';
import { PuppeteerInformationRefinery } from './puppeteer.information-refinery';

describe('Fake refinery implementation', () => {
  const refinery: InformationRefinery = new PuppeteerInformationRefinery();
  it('should extract date for creation date', () => {
    const rawValue = [
      {
        htmlMarkupAttribute: 'innerText',
        selector: '',
        property: 'creationDate',
        rawValue: '20-02-2022  add some text after',
        extractMethod: /([\d|-])+/,
      },
    ];
    const result = refinery.transformRawData(rawValue);
    expect(result[0].creationDate).toEqual('20-02-2022');
  });
});
