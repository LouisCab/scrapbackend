import { Body, Controller, Get, Post } from '@nestjs/common';
import { Company } from '../../domain/company';
import { GetCompanyInformationsService } from './get-company-informations.service';

@Controller('company')
export class ScrapCompanyHttpController {
  constructor(private readonly scrapService: GetCompanyInformationsService) {}

  @Post('/getCompanyInformations')
  async getCompanyInformations(@Body() req: any): Promise<Company> {
    return await this.scrapService.getInformationsForCompany(req.companyName);
  }

  @Get('/hello')
  getHello() {
    return this.scrapService.getHello();
  }
}
