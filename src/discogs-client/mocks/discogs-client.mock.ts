import { DiscogsClient } from '../interfaces/discogs-client.interface';
import { FindRecordsDto } from '../../bcs-records-api/requests/find-records-request-dto';
import { DiscogsPaginatedSearchResult } from '../data-interfaces/discogs-search-result.interface';

export const createDiscogsClientMock = (): DiscogsClient => ({
    findRecords: jest.fn((FindRecordsDto: FindRecordsDto) => Promise.resolve({} as DiscogsPaginatedSearchResult)),
    getPriceSuggestions: jest.fn((discogsId: string) => Promise.resolve(0)),
})