import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto';
import { ReleaseGroupSearchResponse } from './data-interfaces/release-group-search-response.interface';

@Injectable()
export class MusicbrainzService {

    private logger = new Logger('MusicbrainzService')

    private MUSICBRAINZ_BASE_PATH: string;
    private RELEASE_GROUP: string;

    constructor(private readonly httpService: HttpService) {
        this.MUSICBRAINZ_BASE_PATH = "https://musicbrainz.org/ws/2/";
        this.RELEASE_GROUP = "release-group";
    }

    async findReleaseGroup(findRecordsDto: FindRecordsDto): Promise<ReleaseGroupSearchResponse> {
        const queryParams = {
            releasegroup: findRecordsDto.title,
            artist: findRecordsDto.artist
        }
        const url = this.buildQuery(queryParams, this.RELEASE_GROUP);
        this.logger.log(`Searching url: ${url}`);

        const { data } = await lastValueFrom(this.httpService.get<ReleaseGroupSearchResponse>(url).pipe(
            catchError((error: AxiosError) => {
                this.logger.error('An error occurred making request to Musicbrainz API:', error);
                throw error;
            })
        ));

        return data;
    }

    private buildQuery(parameters: Record<string, any>, endpoint: string): string{
        const queryParts: string[] = [];

        
        for(const [key, value] of Object.entries(parameters)){
            if (value !== undefined){
                queryParts.push(`${key}:${encodeURIComponent(value)}`); 
            }
        }

        const query = queryParts.join('%20AND%20');

        return `${this.MUSICBRAINZ_BASE_PATH}${endpoint}/?query=${query}&fmt=json`;

    }
}
