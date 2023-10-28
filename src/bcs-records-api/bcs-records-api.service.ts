import { Injectable } from '@nestjs/common';
import { DiscogsResponse } from 'src/discogs-client/transfer-objects/responses/discogs-response/discogs-response.interface';
import { FindRecordsDto } from './requests/find-records-request-dto';
import { DiscogsClientService } from 'src/discogs-client/discogs-client.service';

@Injectable()
export class BcsRecordsApiService {

    constructor(private readonly discogsClientService:DiscogsClientService){};

    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsResponse> {

        return this.discogsClientService.findRecords(findRecordsDto);

    }
}
