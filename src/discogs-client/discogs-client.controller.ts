import { Controller, Get, Req } from '@nestjs/common';
import { DiscogsClientService } from './discogs-client.service';
import { get } from 'http';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { request } from 'https';


@Controller('discogs-client')
export class DiscogsClientController {
  constructor(private readonly discogsClientService: DiscogsClientService) {}

  @Get()
  async getPriceSuggestion(@Req() request: Request): Promise<String> {
    return this.discogsClientService.getPriceSuggestion(request.body['discogsId']);
  }

}
