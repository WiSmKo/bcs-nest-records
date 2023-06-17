import { HttpService } from '@nestjs/axios';
import { Injectable, Req } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class DiscogsClientService {

    constructor(private readonly httpService: HttpService) {}

    async getPriceSuggestion(discogsId: String): Promise<PriceSuggestion[]>{
        const { data } = await firstValueFrom(
            this.httpService.get<PriceSuggestion[]>('https://api.discogs.com/marketplace/price_suggestions/'+discogsId, 
            {headers: {'Authorization' : 'Discogs token='+process.env.DISCOGS_TOKEN}}).pipe(
                catchError((error: AxiosError) => {
                    console.log(error.response.data);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }
}

export class PriceSuggestion {
    condition: {
        currency: String
        value: number
    }
}
