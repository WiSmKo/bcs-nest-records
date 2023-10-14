import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscogsClientModule } from './discogs-client/discogs-client.module';
import { ConfigModule } from '@nestjs/config';
import { BcsRecordsApiModule } from './bcs-records-api/bcs-records-api.module';

@Module({
  imports: [DiscogsClientModule, ConfigModule.forRoot(), BcsRecordsApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
