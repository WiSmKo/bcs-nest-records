import { Test, TestingModule } from '@nestjs/testing';
import { DiscogsClientService } from './discogs-client.service';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('DiscogsClientService', () => {
  let service: DiscogsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [DiscogsClientService]
    }).compile();

    service = module.get<DiscogsClientService>(DiscogsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // find records

  

  // price sugegstiom
});
