import { Injectable } from '@nestjs/common';
import { DiscogsPaginatedSearchResult } from '../discogs-client/transfer-objects/responses/discogs-response/discogs-search-result.interface';
import { FindRecordsDto } from './requests/find-records-request-dto';
import { DiscogsClientService } from '../discogs-client/discogs-client.service';

@Injectable()
export class BcsRecordsApiService {

    constructor(private readonly discogsClientService:DiscogsClientService){};

    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult> {
        return this.discogsClientService.findRecords(findRecordsDto);
    }

    getPriceSuggestion(discogsId: String): Promise<number>{
        return this.discogsClientService.getPriceSuggestions(discogsId.valueOf());   
    }
}
