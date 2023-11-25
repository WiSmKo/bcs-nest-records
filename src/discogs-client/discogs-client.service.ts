import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { DiscogsResponse } from './transfer-objects/responses/discogs-response/discogs-response.interface';
import { Logger } from '@nestjs/common';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'

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
    async findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsResponse>{ 

        const queryParams = {
            type: "release",
            format: "vinyl",
            title: findRecordsDto.title,
            artist: findRecordsDto.artist,
            year: findRecordsDto.year,
            label: findRecordsDto.label,
            country: findRecordsDto.country
        }

        let url: string = this.buildQuery(queryParams, this.databaseSearchEndpoint);

        this.logger.log(`Searching url: ${url}`);

        //Given that it seems nest.js wraps axios calls in observables for Nest's reactive approach, we use rxjs to convert  response to a promise.
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

