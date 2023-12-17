import { Test, TestingModule } from '@nestjs/testing';
import { BcsRecordsApiController } from './bcs-records-api.controller';
import { DiscogsClientService } from '../discogs-client/discogs-client.service';
import { DiscogsResponse } from '../discogs-client/transfer-objects/responses/discogs-response/discogs-response.interface'
import { DiscogsClientModule } from '../discogs-client/discogs-client.module';
import { BcsRecordsApiService } from './bcs-records-api.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { FindRecordsDto } from 'src/bcs-records-api/requests/find-records-request-dto'

describe('BcsRecordsApiController', () => {
    let controller: BcsRecordsApiController;
    let discogsService: DiscogsClientService;

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [HttpModule, HttpService, DiscogsClientModule],
        controllers: [BcsRecordsApiController],
        providers: [DiscogsClientService],
        
    }).compile();

      controller = module.get<BcsRecordsApiController>(BcsRecordsApiController);
      discogsService = module.get<DiscogsClientService>(DiscogsClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    describe('findRecords', () => {
        it('should return an a response from the discogs API', async () => {
            const result = expectedResponse;
            const request = new FindRecordsDto();

            jest.spyOn(discogsService, 'findRecords').mockImplementation(() => result);

            expect(await discogsService.findRecords(request)).toBe(result);
        })
    })
});

const expectedResponse: Promise<DiscogsResponse> = Promise.resolve({
    pagination: {
        page: 1,
        pages: 1,
        per_page: 50,
        items: 1,
        urls: {},
    },
    results: [
        {
            country: 'US',
            year: '1984',
            format: ['Vinyl', '7"', '45 RPM', 'Single', 'Test Pressing'],
            label: ['Warner Bros. Records', 'Specialty Records Corporation'],
            type: 'release',
            genre: ['Rock', 'Pop'],
            style: ['Pop Rock'],
            id: 16917822,
            barcode: [
                '[SRC logo]',
            ],
            user_data: {
                in_wantlist: false,
                in_collection: false,
            },
            master_id: 26913,
            master_url: 'https://api.discogs.com/masters/26913',
            uri: '/release/16917822-Prince-Purple-Rain',
            catno: '729174',
            title: 'Prince - Purple Rain',
            thumb: 'https://i.discogs.com/R53wn3237bznbc7xRVp6hDlLasVdSZ-XJe0GDhhn5xM/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2OTE3/ODIyLTE2Mjc5MjUy/NTQtODIyNC5qcGVn.jpeg',
            cover_image: 'https://i.discogs.com/fhnJkgFT20mb2PO6eA6h3curZLVyUGZ82yP_O8xXsIA/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2OTE3/ODIyLTE2Mjc9/8 9/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2OTE3/ODIyLTE2Mjc5MjUy/NTQtODIyNC5qcGVn.jpeg',
            resource_url: 'https://api.discogs.com/releases/16917822',
            community: {
                want: 56,
                have: 4,
            },
            format_quantity: 1,
            formats: [
                {
                    name: 'Vinyl',
                    qty: '1',
                    descriptions: ['7"', '45 RPM', 'Single', 'Test Pressing'],
                },
            ],
        },
    ],
});
