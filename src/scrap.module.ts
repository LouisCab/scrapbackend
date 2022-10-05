import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocieteComProvider } from './infrastructure/information-provider/societe-com/societe-com.information-provider';
import { ScrapCompanyHttpController } from './infrastructure/get-company-informations/get-company-informations.controller';
import { GetCompanyInformationsService } from './infrastructure/get-company-informations/get-company-informations.service';
import { LinkedinProvider } from './infrastructure/information-provider/linkedin/linkedin.information-provider';

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

const getCompanyInformationsService: FactoryProvider = {
  provide: GetCompanyInformationsService,
  inject: [LinkedinProvider, SocieteComProvider],
  useFactory: (linkedin: LinkedinProvider, societeCom: SocieteComProvider) => {
    return new GetCompanyInformationsService([linkedin, societeCom]);
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
    }),
  ],
  controllers: [ScrapCompanyHttpController],
  providers: [...providers, getCompanyInformationsService],
})
export class ScrapModule {}
