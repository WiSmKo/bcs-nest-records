import { Module } from '@nestjs/common';
import { MusicbrainzService } from './musicbrainz.service';

@Module({
  providers: [MusicbrainzService]
})
export class MusicbrainzModule {}
