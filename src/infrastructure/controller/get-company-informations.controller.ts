import { Body, Controller, Post } from '@nestjs/common';
import { Company } from '../../domain/company';
import { GetCompanyInformationsService } from '../../application/services/get-company-informations.service';

@Controller('company')
export class GetCompanyInformationsController {
  constructor(private readonly scrapService: GetCompanyInformationsService) {}

  @Post('/getCompanyInformations')
  async getCompanyInformations(@Body() req: any): Promise<Company> {
    return await this.scrapService.getInformationsForCompany(req.companyName);
  }
}
