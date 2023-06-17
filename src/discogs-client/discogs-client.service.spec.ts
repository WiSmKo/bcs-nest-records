import { Test, TestingModule } from '@nestjs/testing';
import { DiscogsClientService } from './discogs-client.service';

describe('DiscogsClientService', () => {
  let service: DiscogsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscogsClientService],
    }).compile();

    service = module.get<DiscogsClientService>(DiscogsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
