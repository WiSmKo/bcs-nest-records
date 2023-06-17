import { Module } from '@nestjs/common';
import { DiscogsClientService } from './discogs-client.service';
import { DiscogsClientController } from './discogs-client.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  controllers: [DiscogsClientController],
  providers: [DiscogsClientService]
})
export class DiscogsClientModule {}
