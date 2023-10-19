import { HttpService } from '@nestjs/axios';
import { Injectable, Req } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { DiscogsResponse } from './discogs-response/discogs-response.interface';
import { Logger } from '@nestjs/common';

@Injectable()
export class DiscogsClientService {

    private logger = new Logger('DiscogsClientService');

    private baseUrl: string;
    private databaseSearchEndpoint: string;
    private discogsAuthToken: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = process.env.DISCOGS_BASE_URL;
        this.databaseSearchEndpoint = '/database/search';
        this.discogsAuthToken = process.env.DISCOGS_TOKEN;

    }

    /**
     * Client method for searching the Discogs API, making use of the GET /database/search endpoint.
     * 
     * @param title name of the release
     * @param artist name of the recording artist
     * @param year relase year
     * @param label name of the label the record was released on
     * @returns 
     */
    async findRecords(title: string, artist: string, year: string, label: string): Promise<DiscogsResponse>{ 

        const queryParams = {
            type: "release",
            format: "vinyl",
            title: title,
            artist: artist,
            year: year,
            label: label
        }

        let url: string = this.buildQuery(queryParams, this.databaseSearchEndpoint);

        this.logger.log(`Searching url: ${url}`);

        const { data } = await firstValueFrom(
            this.httpService.get<DiscogsResponse>(url, 
                {headers: 
                    {'Authorization' : 'Discogs token='+this.discogsAuthToken}}).pipe(
                    catchError((error: AxiosError) => {
                    this.logger.error('An error occurred making request to Discogs API:', error);
                    throw error;
                }),
            ),
        )

        return data;
    }

    /**
     * 
     * This helper method is used to build the url for the search, taking search parameters and the endpoint as 
     * parameters and using the base url declared in the classes constructor to build the url.
     * 
     * @param parameters is the query parameters of the request
     * @param endpoint the end point we want to reach
     * @returns string of the url  
     */
    private buildQuery(parameters: Record<string, any>, endpoint: string): string{

        const urlSearchParams = new URLSearchParams();
        for(const [key, value] of Object.entries(parameters)){
            if (value !== undefined){
                urlSearchParams.append(key, value);
            }
        }

        return `${this.baseUrl}${endpoint}?${urlSearchParams.toString()}`;

    }

}

