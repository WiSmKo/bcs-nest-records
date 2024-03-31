import { Test, TestingModule } from '@nestjs/testing';
import { BcsRecordsApiService } from './bcs-records-api.service';
import { DiscogsClientService } from '../discogs-client/discogs-client.service';

jest.mock('../discogs-client/discogs-client.service');

describe('BcsRecordsApiService', () => {
  let service: BcsRecordsApiService;
  let discogsClientServiceMock: jest.Mocked<DiscogsClientService>;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcsRecordsApiService,
      {
        provide: DiscogsClientService,
        useValue: {discogsClientServiceMock}
      }],
    }).compile();

    service = module.get<BcsRecordsApiService>(BcsRecordsApiService);
    discogsClientServiceMock = module.get(DiscogsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
