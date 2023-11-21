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
}
