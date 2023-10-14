import { HttpService } from '@nestjs/axios';
import { Injectable, Req } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { PriceSuggestion }  from './price-suggestion/price-suggestion.interface';
import { DiscogsResponse } from './discogs-response/discogs-response.interface';

@Injectable()
export class DiscogsClientService {

    constructor(private readonly httpService: HttpService) {}

    async findRecords(title: string, artist: string, year: string, label: string): Promise<DiscogsResponse>{

        let database_search_url: string = '/database/search?';

        const queryParams = {
            type: "release",
            format: "vinyl",
            title: title,
            artist: artist,
            year: year,
            label: label
        }


        const urlSearchParams = new URLSearchParams();
        for(const [key, value] of Object.entries(queryParams)){
            if (value !== undefined){
                urlSearchParams.append(key, value);
            }
        }

        console.log(`Discogs Client Service: Searching for records with parameters: ${urlSearchParams.toString()}`);

        //DO We WANT THIS TO BE firstValueFrom?
        const { data } = await firstValueFrom(
            this.httpService.get<DiscogsResponse>(process.env.DISCOGS_BASE_URL+database_search_url.concat(urlSearchParams.toString()),
            {headers: {'Authorization' : 'Discogs token='+process.env.DISCOGS_TOKEN}}).pipe(
                catchError((error: AxiosError) => {
                    console.log(error.response.data);
                    throw 'An error happened.';
                }),
            ),
        )
        return data;
    }

}

