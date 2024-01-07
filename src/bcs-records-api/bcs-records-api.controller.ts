import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { DiscogsClientService } from 'src/discogs-client/discogs-client.service';
import { DiscogsPaginatedSearchResult } from 'src/discogs-client/transfer-objects/responses/discogs-response/discogs-search-result.interface';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'
import { ArtistOrTitleRequiredPipe } from 'src/bcs-records-api/validation/find-records-custom-pipe'
import { BcsRecordsApiService } from './bcs-records-api.service';
import { PriceSuggestion }  from 'src/discogs-client/transfer-objects/responses/price-suggestion/price-suggestion.interface';

@Controller('bcs')
export class BcsRecordsApiController {

    constructor(private readonly bcsRescordsApiService:BcsRecordsApiService){};

    @Get('find-records')
    @UsePipes(ArtistOrTitleRequiredPipe)
    async findRecords(@Query() findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult>{
      return this.bcsRescordsApiService.findRecords(findRecordsDto);
    }

    @Get('price-suggestion')
    async getPriceSuggestion(@Query('discogsId') discogsId: string): Promise<number> {
      console.log(this.bcsRescordsApiService.getPriceSuggestion(discogsId));
      return this.bcsRescordsApiService.getPriceSuggestion(discogsId);
    }
  
}
