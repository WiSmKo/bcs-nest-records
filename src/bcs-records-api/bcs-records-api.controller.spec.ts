import { Test, TestingModule } from '@nestjs/testing';
import { BcsRecordsApiController } from './bcs-records-api.controller';
import { DiscogsClient } from 'src/discogs-client/interfaces/discogs-client.interface';
import { DiscogsClientModule } from '../discogs-client/discogs-client.module';
import { HttpModule } from '@nestjs/axios';
import { FindRecordsDto } from './requests/find-records-request-dto'
import { BcsRecordsApiService } from './bcs-records-api.service';
import { createDiscogsClientMock } from '../discogs-client/mocks/discogs-client.mock';

describe('BcsRecordsApiController', () => {
    let controller: BcsRecordsApiController;
    let discogsClientMock: DiscogsClient;

  beforeEach(async () => {
    discogsClientMock = createDiscogsClientMock();
    
      const module: TestingModule = await Test.createTestingModule({
        imports: [HttpModule, DiscogsClientModule, FindRecordsDto],
        controllers: [BcsRecordsApiController],
        providers: [BcsRecordsApiService,
          {
            provide: 'DiscogsClient',
            useValue: discogsClientMock,
          }],
        
    }).compile();

      controller = module.get<BcsRecordsApiController>(BcsRecordsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
