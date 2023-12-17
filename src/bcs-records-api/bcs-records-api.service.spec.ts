import { Test, TestingModule } from '@nestjs/testing';
import { BcsRecordsApiService } from './bcs-records-api.service';

describe('BcsRecordsApiService', () => {
  let service: BcsRecordsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcsRecordsApiService],
    }).compile();

    service = module.get<BcsRecordsApiService>(BcsRecordsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
