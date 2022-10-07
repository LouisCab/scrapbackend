describe('e2e test', () => {
  it('should return company for given name"', async () => {
    const req = { companyName: 'gojob' };
    const company = await service.getCompanyInformations(req);
    expect(company).toBeDefined();
  });
});
