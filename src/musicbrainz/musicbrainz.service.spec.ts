import { Test, TestingModule } from '@nestjs/testing';
import { MusicbrainzService } from './musicbrainz.service';
import { HttpService } from '@nestjs/axios';
import { FindRecordsDto } from '../bcs-records-api/requests/find-records-request-dto';
import { lastValueFrom, Observable, of } from 'rxjs';

describe('MusicbrainzService', () => {
  let service: MusicbrainzService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicbrainzService,
        {
          provide: HttpService,
          useValue: {get: jest.fn()}
        }

      ],
    }).compile();

    service = module.get<MusicbrainzService>(MusicbrainzService);
    httpService = module.get<HttpService>(HttpService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findReleaseGroup', () => {
    it('should call httpService.get with the correct URL', async () => {
      const findRecordsDto = new FindRecordsDto();
      findRecordsDto.title = 'some title';
      findRecordsDto.artist = 'some artist';
      const url = 'https://musicbrainz.org/ws/2/release-group/?query=releasegroup:some%20title%20AND%20artist:some%20artist&fmt=json';

      (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: {} }));

      await service.findReleaseGroup(findRecordsDto);

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(url);
    });
    
  });
});
