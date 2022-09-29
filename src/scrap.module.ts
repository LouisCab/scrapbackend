import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkedinProvider } from './infrastructure/provider/linkedin/linkedin.provider';
import { SocieteComProvider } from './infrastructure/provider/societe-com/societe-com.provider';
import { ScrapCompanyInfoHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { GetCompanyInformationsService } from './infrastructure/get-company-informations/get-company-informations.service';

const getCompanyInformationsService: FactoryProvider = {
  provide: GetCompanyInformationsService,
  inject: [LinkedinProvider, SocieteComProvider],
  useFactory: (societeComProvider, linkedinCrawlerProvider) => {
    return [
      new SocieteComProvider(societeComProvider),
      new LinkedinProvider(linkedinCrawlerProvider),
    ];
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
    }),
  ],
  controllers: [ScrapCompanyInfoHttpController],
  providers: [getCompanyInformationsService],
})
export class ScrapModule {}
