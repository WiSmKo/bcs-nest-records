import { Controller, Get, Query } from '@nestjs/common';
import { DiscogsClientService } from 'src/discogs-client/discogs-client.service';
import { DiscogsResponse } from 'src/discogs-client/discogs-response/discogs-response.interface';

@Controller('bcs')
export class BcsRecordsApiController {

    constructor(private readonly discogsClientService:DiscogsClientService){};

    @Get('discogs-search')
    async findRecords(@Query('title') title?: string, @Query('artist') artist?: string, @Query('year') year?: string, @Query('label') label?: string): Promise<DiscogsResponse>{
      return this.discogsClientService.findRecords(title, artist, year, label);
    }
  
}
