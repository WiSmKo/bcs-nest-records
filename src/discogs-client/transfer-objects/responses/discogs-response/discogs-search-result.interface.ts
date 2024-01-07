export class DiscogsPaginatedSearchResult {
    pagination: {
      page: number;
      pages: number;
      per_page: number;
      items: number;
      urls: Record<string, string>;
    };
    results: DiscogsItem[];
  }

  export class DiscogsItem {
    country: string;
    year: string;
    format: string[];
    label: string[];
    type: string;
    genre: string[];
    style: string[];
    id: number;
    barcode: string[];
    user_data: {
      in_wantlist: boolean;
      in_collection: boolean;
    };
    master_id: number;
    master_url: string;
    uri: string;
    catno: string;
    title: string;
    thumb: string;
    cover_image: string;
    resource_url: string;
    community: {
      want: number;
      have: number;
    };
    format_quantity: number;
    formats: DiscogsFormat[];
  }
  
  export class DiscogsFormat {
    name: string;
    qty: string;
    descriptions: string[];
  }