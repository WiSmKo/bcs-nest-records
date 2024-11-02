import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { DiscogsPaginatedSearchResult } from './transfer-objects/responses/discogs-response/discogs-search-result.interface';
import { Logger } from '@nestjs/common';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'
import { PriceSuggestion }  from './transfer-objects/responses/price-suggestion/price-suggestion.interface';

@Injectable()
export class DiscogsClientService {

    private logger = new Logger('DiscogsClientService');

    private DISCOGS_BASE_PATH: string;
    private DATABASE_SEARCH_PATH: string;
    private DISCOGS_AUTH_TOKEN: string;

    constructor(private readonly httpService: HttpService) {
        this.DISCOGS_BASE_PATH = process.env.DISCOGS_BASE_URL;
        this.DATABASE_SEARCH_PATH = '/database/search';
        this.DISCOGS_AUTH_TOKEN = process.env.DISCOGS_TOKEN;

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
    async findRecords(findRecordsDto: FindRecordsDto): Promise<DiscogsPaginatedSearchResult>{ 

        const queryParams = {
            type: "release",
            format: "vinyl",
            title: findRecordsDto.title,
            artist: findRecordsDto.artist,
            year: findRecordsDto.year,
            label: findRecordsDto.label,
            country: findRecordsDto.country,
            page: findRecordsDto.page,
            per_page: findRecordsDto.per_page,
            catno: findRecordsDto.catno
        }

        let url: string = this.buildQuery(queryParams, this.DATABASE_SEARCH_PATH);

        this.logger.log(`Searching url: ${url}`);

        //Given that it seems nest.js wraps axios calls in observables for Nest's reactive approach, we use rxjs to convert response to a promise.
        const { data } = await firstValueFrom(
            this.httpService.get<DiscogsPaginatedSearchResult>(url, 
                {headers: 
                    {'Authorization' : 'Discogs token='+this.DISCOGS_AUTH_TOKEN}}).pipe(
                    catchError((error: AxiosError) => {
                    this.logger.error('An error occurred making request to Discogs API:', error);
                    throw error;
                }),
            ),
        )

        return data;
    }

    async getPriceSuggestions(discogsId: String): Promise<number>{
        this.logger.log(`Discogs Client Service: Getting price suggestions for discogs id [${discogsId}]`)
        const { data } = await firstValueFrom(
            this.httpService.get<PriceSuggestion>('https://api.discogs.com/marketplace/price_suggestions/'+discogsId, 
            {headers: {'Authorization' : 'Discogs token='+this.DISCOGS_AUTH_TOKEN}}).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error('An error occurred making request to Discogs API:', error);
                    throw 'Discogs client request failed.';
                }),
            ),
        )
        const vgPlusCondition = data["Very Good Plus (VG+)"]; // Directly accessing the VG+ condition, we can modify this later to accept a parameter here and filter condition by the input
        return vgPlusCondition ? vgPlusCondition.value : null;
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

        return `${this.DISCOGS_BASE_PATH}${endpoint}?${urlSearchParams.toString()}`;

    }

}

