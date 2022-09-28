import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapService {
  getHello(): string {
    return 'Hello World!';
  }
}
