import { HttpService } from '@nestjs/axios';
import { Injectable, Req } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { PriceSuggestion }  from './price-suggestion/price-suggestion.interface';

@Injectable()
export class DiscogsClientService {

    constructor(private readonly httpService: HttpService) {}

    async getPriceSuggestions(discogsId: String): Promise<PriceSuggestion>{
        console.log(`Discogs Client Service: Getting price suggestions for discogs id [${discogsId}]`)
        const { data } = await firstValueFrom(
            this.httpService.get<PriceSuggestion>('https://api.discogs.com/marketplace/price_suggestions/'+discogsId, 
            {headers: {'Authorization' : 'Discogs token='+process.env.DISCOGS_TOKEN}}).pipe(
                catchError((error: AxiosError) => {
                    console.log(error.response.data);
                    throw 'An error happened!';
                }),
            ),
        )
        return data;
    }

    async getPriceSuggestion(discogsId: String): Promise<string>{
        const price_suggestions = await this.getPriceSuggestions(discogsId.valueOf());
        return price_suggestions["Good (G)"].value.toString();
    }
}
