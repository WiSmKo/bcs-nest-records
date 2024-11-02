import { Injectable } from '@nestjs/common';
import { DiscogsPaginatedSearchResult } from '../discogs-client/transfer-objects/responses/discogs-response/discogs-search-result.interface';
import { FindRecordsDto } from './requests/find-records-request-dto';
import { DiscogsClientService } from '../discogs-client/discogs-client.service';
import { ReleaseGroupSearchResponse } from 'src/musicbrainz/data-interfaces/release-group-search-response.interface';
import { MusicbrainzService } from 'src/musicbrainz/musicbrainz.service';
import { FindRecordResponse } from './responses/find-record-response';
import { FindUrlsResponse } from 'src/musicbrainz/data-interfaces/find-urls-response';

@Injectable()
export class BcsRecordsApiService {

    constructor(private readonly discogsClientService:DiscogsClientService, private readonly musicbrainzService:MusicbrainzService){};

    findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult> {
        return this.discogsClientService.findRecords(findRecordsDto);
    }

    getPriceSuggestion(discogsId: String): Promise<number>{
        return this.discogsClientService.getPriceSuggestions(discogsId.valueOf());   
    }

    async findRecord(findRecordsDto: FindRecordsDto): Promise<FindRecordResponse> {        
        
        let priceSuggestion: number;
        const release: ReleaseGroupSearchResponse = await this.musicbrainzService.findReleaseGroup(findRecordsDto);
        const relations: FindUrlsResponse = await this.musicbrainzService.findUrls(release['release-groups'][0].releases[0].id);
        const discogsId = this.getDiscogsResourceId(relations);

        if(discogsId){
            priceSuggestion = await this.discogsClientService.getPriceSuggestions(discogsId);
        }

        const findRecordResponse: FindRecordResponse = {
            title: release['release-groups'][0].title,
            artist: release['release-groups'][0]['artist-credit'][0].artist.name,
            year: release['release-groups'][0]['first-release-date'],
            type: release['release-groups'][0]['primary-type'],
            noOfReleases: release['release-groups'][0].count,
            priceSuggestion: priceSuggestion
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
