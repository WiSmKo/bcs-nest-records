import { Module } from '@nestjs/common';
import { DiscogsClientService } from './discogs-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  providers: [DiscogsClientService],
  exports: [DiscogsClientService]
})
export class DiscogsClientModule {}
