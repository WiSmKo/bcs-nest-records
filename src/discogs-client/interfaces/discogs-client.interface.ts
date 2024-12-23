import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'
import { DiscogsPaginatedSearchResult } from '../data-interfaces/discogs-search-result.interface';

export interface DiscogsClient {
    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult>;
    getPriceSuggestions(discogsId: string): Promise<number>;
}