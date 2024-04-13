import { Module } from '@nestjs/common';
import { BcsRecordsApiController } from './bcs-records-api.controller';
import { BcsRecordsApiService } from './bcs-records-api.service';
import { DiscogsClientModule } from 'src/discogs-client/discogs-client.module';

@Module({
  imports: [DiscogsClientModule],
  controllers: [BcsRecordsApiController],
  providers: [BcsRecordsApiService]
})
export class BcsRecordsApiModule {}
