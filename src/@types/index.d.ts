
export type ISpotifyToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};


// https://developer.spotify.com/documentation/web-api/reference/get-an-album
export interface ISpotifyAlbum {
  id: string;
  name: string;
  label: string;
  type: string;
  release_date: string;
  artists: {
    name: string;
  }[];
  external_ids: {
    upc: string;
    ean: string;
  };
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
  }[];
};



export interface IMasterRelease {
  main_release: number;
};


export interface IDiscogsRelease {
  id: number;
  status: string;
  uri: string;
  labels: any[];
  artists: any[];
  master_id: number;
  title: string;
  released: string;
  notes: string;
  identifiers: any[];
  formats: any[];
  year: number;
  cover_image?: string;
};


