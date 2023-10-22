import { Controller, Get, Query } from '@nestjs/common';
import { DiscogsClientService } from 'src/discogs-client/discogs-client.service';
import { DiscogsResponse } from 'src/discogs-client/transfer-objects/responses/discogs-response/discogs-response.interface';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'

@Controller('bcs')
export class BcsRecordsApiController {

    constructor(private readonly discogsClientService:DiscogsClientService){};

    @Get('discogs-search')
    async findRecords(@Query() findRecordsDto: FindRecordsDto): Promise<DiscogsResponse>{
      return this.discogsClientService.findRecords(findRecordsDto);
    }
  
}
