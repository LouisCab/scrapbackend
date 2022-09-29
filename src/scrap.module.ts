import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkedinProvider } from './infrastructure/provider/linkedin/linkedin.provider';
import { SocieteComProvider } from './infrastructure/provider/societe-com/societe-com.provider';
import { ScrapCompanyInfoHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { GetCompanyInformationsService } from './infrastructure/get-company-informations/get-company-informations.service';
import { SocieteComExtractor } from './infrastructure/extractor/societe-com/societe-com.extractor';

const providers = [
  {
    provide: LinkedinProvider,
    inject: [],
    useFactory() {
      return new LinkedinProvider();
    },
  },
  {
    provide: SocieteComProvider,
    inject: [],
    useFactory() {
      return new SocieteComProvider();
    },
  },
];

const extractors = [
  {
    provide: SocieteComExtractor,
    inject: [],
    useFactory() {
      return new SocieteComExtractor();
    },
  },
];

const getCompanyInformationsService: FactoryProvider = {
  provide: GetCompanyInformationsService,
  inject: [LinkedinProvider, SocieteComProvider, SocieteComExtractor],
  useFactory: (
    linkedin: LinkedinProvider,
    societeCom: SocieteComProvider,
    societeComExtractor: SocieteComExtractor,
  ) => {
    return new GetCompanyInformationsService(
      [linkedin, societeCom],
      [societeComExtractor],
    );
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
    }),
  ],
  controllers: [ScrapCompanyInfoHttpController],
  providers: [...providers, ...extractors, getCompanyInformationsService],
})
export class ScrapModule {}
