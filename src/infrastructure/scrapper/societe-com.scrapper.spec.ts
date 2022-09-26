import { SocieteComScrapper } from './societe-com.scrapper';

describe('Societe.com scrapper', () => {
  it('should retrieve raw page of specified company', async () => {
    const scrapper = new SocieteComScrapper('gojob');
    const page = await scrapper.loadContent();

    expect(page).toBeDefined();
  });
});
