import { Test, TestingModule } from '@nestjs/testing';
import { ScrapController } from './app.controller';
import { ScrapService } from './app.service';

describe('AppController', () => {
  let appController: ScrapController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScrapController],
      providers: [ScrapService],
    }).compile();

    appController = app.get<ScrapController>(ScrapController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
