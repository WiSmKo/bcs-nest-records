import { Injectable } from '@nestjs/common';
import { DiscogsResponse } from 'src/discogs-client/transfer-objects/responses/discogs-response/discogs-response.interface';
import { FindRecordsDto } from './requests/find-records-request-dto';
import { DiscogsClientService } from 'src/discogs-client/discogs-client.service';
import { PriceSuggestion }  from 'src/discogs-client/transfer-objects/responses/price-suggestion/price-suggestion.interface';

@Injectable()
export class BcsRecordsApiService {

    constructor(private readonly discogsClientService:DiscogsClientService){};

    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsResponse> {

        return this.discogsClientService.findRecords(findRecordsDto);

    }

    getPriceSuggestion(discogsId: String): Promise<number>{
        return this.discogsClientService.getPriceSuggestions(discogsId.valueOf());
        
    }
}
