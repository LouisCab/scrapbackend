import { SocieteComCrawler } from './societe-com.crawler';

describe('Societe.com scrapper', () => {
  // jest.setTimeout(10000);
  it('should retrieve raw page of specified company', async () => {
    const scrapper = new SocieteComCrawler('gojob');
    const page = await scrapper.loadContent();
    expect(page).toBeDefined();
  });
});
