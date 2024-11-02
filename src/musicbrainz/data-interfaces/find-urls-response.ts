export interface FindUrlsResponse {
    created: string;
  count: number;
  offset: number;
  urls: {
    id: string;
    score: number;
    resource: string;
    'relation-list': {
        relations: {
          type: string;
          'type-id': string;
          direction: string;
          release: {
            id: string;
            title: string;
          };
        }[];
    }[];
  }[];
};