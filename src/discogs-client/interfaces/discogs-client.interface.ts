import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'
import { DiscogsPaginatedSearchResult } from '../transfer-objects/responses/discogs-response/discogs-search-result.interface';

export interface DiscogsClient {
    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult>;
    getPriceSuggestions(discogsId: string): Promise<number>;
}