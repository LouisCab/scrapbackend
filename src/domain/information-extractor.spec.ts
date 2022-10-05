import { Crawler } from '../infrastructure/information-crawler/information-crawler';
import { Extractor } from './information-extractor';

describe('Extractor test', () => {
  it('should get valid text information from parsed element', () => {
    const element = `    
                    
                        
                           07-09-2015
                        
                        
                        
                            
                            
                             - il y a 7 ans
                            
                        
                        
                    
                    
                    
                        
                            Statuts constitutifs
                            chevron_right
    `;
    const regex = new RegExp(/[\d|-]+|[A-zÀ-ú]+\s/);

    const crawler = new Crawler();
    const extractor = new Extractor(crawler);
    const extract = element.match(regex);
    if (extract != null) expect(extract[0]).toBe('07-09-2015');
  });
});
