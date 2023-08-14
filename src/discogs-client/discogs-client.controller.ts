import { Controller, Get, Query, Param, Req } from '@nestjs/common';
import { DiscogsClientService } from './discogs-client.service';
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

  
  /**
   * @deprecated This method was just for intial test POC - we need the getPriceSuggestion end point in the DiscogsClient but we don't need to expose it to our frontend.
   * @todo Remove method
   * @param discogsId 
   * @returns 
   */
  @Get()
  async getPriceSuggestion(@Query('discogsId') discogsId: string): Promise<PriceSuggestion> {
    return this.discogsClientService.getPriceSuggestion(discogsId);
  }

  @Get()
  async findRecords(@Query('title') title: string, @Query('artist') artist: string, @Query('year') year: string, @Query('label') label: string): Promise<DiscogsRecord[]>{
    return this.discogsClientService.findRecords(title, artist, year, label);
  }

}
