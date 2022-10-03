import { NoResultForInput } from '../crawler';
import { SocieteComProvider } from './societe-com.provider';

describe('Societe.com crawler', () => {
  jest.setTimeout(60000);

  let provider: SocieteComProvider;

  beforeEach(() => {
    provider = new SocieteComProvider();
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const elements = await provider.getElementsCompanyInfomations('gojob');
    expect(elements).toBeDefined();
    expect(Object.entries(elements).length).toBe(12);
  });

  it('should get valid text information from parsed element', () => {
    const element = `    
                    
                        
                           07-09-2015
                        
                        
                        
                            
                            
                             - il y a 7 ans
                            
                        
                        
                    
                    
                    
                        
                            Statuts constitutifs
                            chevron_right
    `;
    const regex = new RegExp(/[\d|-]+|[A-zÀ-ú]+\s/);

    const extract = element.match(regex);
    if (extract != null) expect(extract[0]).toBe('07-09-2015');
  });

  it('should throw an error when no result is given on google', async () => {
    await expect(async () =>
      provider.getElementsCompanyInfomations('ozienhoznhbeozebnoeibnoze'),
    ).rejects.toThrow(NoResultForInput);
  });
});
