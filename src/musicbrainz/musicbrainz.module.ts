import { Module } from '@nestjs/common';
import { MusicbrainzService } from './musicbrainz.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  providers: [MusicbrainzService],
  exports: [MusicbrainzService]
})
export class MusicbrainzModule {}
