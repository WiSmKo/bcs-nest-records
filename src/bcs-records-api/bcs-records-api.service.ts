import { Injectable, Logger } from '@nestjs/common';
import { DiscogsPaginatedSearchResult } from '../discogs-client/data-interfaces/discogs-search-result.interface';
import { FindRecordsDto } from './requests/find-records-request-dto';
import { DiscogsClientService } from '../discogs-client/discogs-client.service';
import { ReleaseGroupSearchResponse } from 'src/musicbrainz/data-interfaces/release-group-search-response.interface';
import { MusicbrainzService } from 'src/musicbrainz/musicbrainz.service';
import { FindRecordResponse } from './responses/find-record-response';
import { FindUrlsResponse } from 'src/musicbrainz/data-interfaces/find-urls-response';
import { DiscogsMaster } from 'src/discogs-client/data-interfaces/discogs-master-response.interface';

@Injectable()
export class BcsRecordsApiService {

    private logger = new Logger('BcsRecordsApiService');

    constructor(private readonly discogsClientService:DiscogsClientService, private readonly musicbrainzService:MusicbrainzService){};

    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult> {
        return this.discogsClientService.findRecords(findRecordsDto);
    }

    getPriceSuggestion(discogsId: number): Promise<number>{
        return this.discogsClientService.getPriceSuggestions(discogsId);   
    }

    async findRecord(findRecordsDto: FindRecordsDto): Promise<FindRecordResponse> {        
        
        const discogsSearchResult: DiscogsPaginatedSearchResult = await this.discogsClientService.findRecords(findRecordsDto);
        const discogsMaster: DiscogsMaster = await this.discogsClientService.getMasterRelease(discogsSearchResult.results[0].master_id);

        const mainReleasePriceSuggestion = await this.discogsClientService.getPriceSuggestions(discogsMaster.main_release);
        const latestReleasePriceSuggestion = await this.discogsClientService.getPriceSuggestions(discogsMaster.most_recent_release);  

        const findRecordResponse: FindRecordResponse = {
            title: discogsMaster.title,
            artists: discogsMaster.artists.map(artist => artist.name),
            year: discogsMaster.year,
            noOfTracks: discogsMaster.tracklist.length,
            noForSale: discogsMaster.num_for_sale,
            originalPriceSuggestion: mainReleasePriceSuggestion,
            latestPriceSuggestion: latestReleasePriceSuggestion,
            genres: discogsMaster.genres.concat(discogsMaster.styles)
        }

        return findRecordResponse;
    }

    private getDiscogsResourceId(response: FindUrlsResponse): string | null {
        const urlObject = response.urls[0];
        
        // Find if any relation in 'relation-list' has type 'discogs'
        const hasDiscogsRelation = urlObject['relation-list'].some(relationList =>
          relationList.relations.some(relation => relation.type === 'discogs')
        );
      
        if (hasDiscogsRelation) {
          const resourceUrl = urlObject.resource;
          const parts = resourceUrl.split('/');
          return parts[parts.length - 1] || null; // Return the ID after the last slash
        }
      
        return null;
      }
}
