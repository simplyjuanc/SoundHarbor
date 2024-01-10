
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
