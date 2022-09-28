import { Controller, Get } from '@nestjs/common';
import { ScrapService } from './app.service';

@Controller()
export class ScrapController {
  constructor(private readonly appService: ScrapService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
