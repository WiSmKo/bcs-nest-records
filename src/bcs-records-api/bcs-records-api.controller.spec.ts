import { Test, TestingModule } from '@nestjs/testing';
import { BcsRecordsApiController } from './bcs-records-api.controller';

describe('BcsRecordsApiController', () => {
  let controller: BcsRecordsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BcsRecordsApiController],
    }).compile();

    controller = module.get<BcsRecordsApiController>(BcsRecordsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
