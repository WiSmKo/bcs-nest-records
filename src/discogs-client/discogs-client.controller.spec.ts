import { Test, TestingModule } from '@nestjs/testing';
import { DiscogsClientController } from './discogs-client.controller';
import { DiscogsClientService } from './discogs-client.service';

describe('DiscogsClientController', () => {
  let controller: DiscogsClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscogsClientController],
      providers: [DiscogsClientService],
    }).compile();

    controller = module.get<DiscogsClientController>(DiscogsClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
