export interface Image {
    type: string;
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
  }
  
  export interface Track {
    position: string;
    type_: string;
    title: string;
    extraartists: any[]; // Adjust this if more details on `extraartists` are needed
    duration: string;
  }
  
  export interface Artist {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }
  
  interface Video {
    uri: string;
    title: string;
    description: string | null;
    duration: number;
    embed: boolean;
  }
  
  export interface DiscogsMaster {
    id: number;
    main_release: number;
    most_recent_release: number;
    resource_url: string;
    uri: string;
    versions_url: string;
    main_release_url: string;
    most_recent_release_url: string;
    num_for_sale: number;
    lowest_price: number;
    images: Image[];
    genres: string[];
    styles: string[];
    year: number;
    tracklist: Track[];
    artists: Artist[];
    title: string;
    data_quality: string;
    videos: Video[];
  }