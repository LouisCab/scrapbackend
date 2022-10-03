import { SocieteComProvider } from './societe-com.provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(10000);
  it('should retrieve all aimed information on page for specified company', async () => {
    const provider = new SocieteComProvider();
    const elements = await provider.getElementsCompanyInfomations('gojob');
    expect(elements).toBeDefined();
    expect(Object.entries(elements).length).toBe(12);
  });

  it.skip('should get valid text information from parsed element', () => {
    const element = `    
                    
                        
                           07-09-2015
                        
                        
                        
                            
                            
                             - il y a 7 ans
                            
                        
                        
                    
                    
                    
                        
                            Statuts constitutifs
                            chevron_right
    `;
    const regex = new RegExp(/[\d|-]+|[A-zÀ-ú]+\s/);

    const extract = element.match(regex);
    if (extract != null) expect(extract).toEqual(['07-09-2015']);
  });
});
