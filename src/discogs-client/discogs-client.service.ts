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
        console.log(`Discogs Client Service: Searching for records with queries: title: [${title}], artist: [${artist}], year: [${year}], label: [${label}]`);
        console.log('/database/search?type=release&format=vinyl&artist='+artist+'&release_title='+title+'&year='+year+'&label='+label);
        //DO We WANT THIS TO BE firstValueFrom?
        const { data } = await firstValueFrom(
            this.httpService.get<DiscogsResponse>(process.env.DISCOGS_BASE_URL+'/database/search?type=release&format=vinyl&artist='+artist
            +'&release_title='+title+'&year='+year+'&label='+label, 
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

