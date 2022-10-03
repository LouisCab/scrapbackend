import { Controller, Get, Post } from '@nestjs/common';
import { Company, CompanyInformation } from '../../domain/company';
import { GetCompanyInformationsService } from './get-company-informations.service';

@Controller('company')
export class ScrapCompanyHttpController {
  constructor(private readonly scrapService: GetCompanyInformationsService) {}

  @Post('/getCompanyInformations')
  async getCompanyInformations(companyName: string): Promise<Company> {
    return await this.scrapService.getInformationsForCompany(companyName);
  }

  @Get('/hello')
  getHello() {
    return this.scrapService.getHello();
  }
}
