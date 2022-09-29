import { Controller, Get, Post } from '@nestjs/common';
import { CompanyInformations } from '../../domain/model/company';
import { ScrapService } from './get-company-informations.service';

@Controller('company')
export class ScrapCompanyInfoHttpController {
  constructor(private readonly scrapService: ScrapService) {}

  @Post('/getCompanyInformations')
  async getCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformations> {
    return await this.scrapService.getCompanyInformations(companyName);
  }

  @Get('/hello')
  getHello() {
    return this.scrapService.getHello();
  }
}
