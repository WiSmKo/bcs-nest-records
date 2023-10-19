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
                    this.logger.error('An error occurred:', error);
                    throw error;
                }),
            ),
        )

        return data;
    }

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

