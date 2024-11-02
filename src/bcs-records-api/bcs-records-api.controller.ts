import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { DiscogsPaginatedSearchResult } from '../discogs-client/transfer-objects/responses/discogs-response/discogs-search-result.interface';
import { FindRecordsDto } from './requests/find-records-request-dto'
import { DatabaseSearchValidationPipe } from './validation/find-records-custom-pipe'
import { BcsRecordsApiService } from './bcs-records-api.service';
import { ReleaseGroupSearchResponse } from 'src/musicbrainz/data-interfaces/release-group-search-response.interface';
import { FindRecordResponse } from './responses/find-record-response';

@Controller('bcs')
export class BcsRecordsApiController {

    constructor(private readonly bcsRescordsApiService:BcsRecordsApiService){};

    @Get('find-records')
    @UsePipes(DatabaseSearchValidationPipe)
    async findRecords(@Query() findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult>{
      return this.bcsRescordsApiService.findRecords(findRecordsDto);
    }

    @Get('price-suggestion')
    async getPriceSuggestion(@Query('discogsId') discogsId: string): Promise<number> {
      return this.bcsRescordsApiService.getPriceSuggestion(discogsId);
    }

    @Get('find-record')
    async findRecord(@Query() findRecordsDto: FindRecordsDto): Promise<FindRecordResponse>{
      return this.bcsRescordsApiService.findRecord(findRecordsDto);
    }
  
}
