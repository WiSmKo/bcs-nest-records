import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { DiscogsClientService } from 'src/discogs-client/discogs-client.service';
import { DiscogsResponse } from 'src/discogs-client/transfer-objects/responses/discogs-response/discogs-response.interface';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'
import { ArtistOrTitleRequiredPipe } from 'src/bcs-records-api/validation/find-records-custom-pipe'

@Controller('bcs')
export class BcsRecordsApiController {

    constructor(private readonly discogsClientService:DiscogsClientService){};

    @Get('find-records')
    @UsePipes(ArtistOrTitleRequiredPipe)
    async findRecords(@Query() findRecordsDto: FindRecordsDto): Promise<DiscogsResponse>{
      return this.discogsClientService.findRecords(findRecordsDto);
    }
  
}
