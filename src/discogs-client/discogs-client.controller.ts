import { Controller, Get, Query, Param, Req } from '@nestjs/common';
import { DiscogsClientService } from './discogs-client.service';
import { PriceSuggestion } from './price-suggestion/price-suggestion.interface';
import { get } from 'http';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { request } from 'https';


@Controller(':discogs-client')
export class DiscogsClientController {
  constructor(private readonly discogsClientService: DiscogsClientService) {}

  @Get()
  async getPriceSuggestion(@Query('discogsId') discogsId: string): Promise<PriceSuggestion> {
    return this.discogsClientService.getPriceSuggestion(discogsId);
  }

}
