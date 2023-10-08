import { Controller, Get, Query, Param, Req } from '@nestjs/common';
import { DiscogsClientService } from './discogs-client.service';
import { DiscogsResponse } from './discogs-response/discogs-response.interface';
import { PriceSuggestion } from './price-suggestion/price-suggestion.interface';
import { get } from 'http';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { request } from 'https';
import { title } from 'process';
import { deprecate } from 'util';


@Controller(':discogs-client')
export class DiscogsClientController {
  constructor(private readonly discogsClientService: DiscogsClientService) {}

  @Get('database')
  async findRecords(@Query('title') title?: string, @Query('artist') artist?: string, @Query('year') year?: string, @Query('label') label?: string): Promise<DiscogsResponse>{
    return this.discogsClientService.findRecords(title, artist, year, label);
  }

}
