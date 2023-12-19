import { Album } from "@spotify/web-api-ts-sdk";
import { JWT } from "next-auth/jwt";

export interface IAuthedJWT extends JWT {
  accessToken: string;
  userId: number;
}


export type ISpotifyToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export interface ISpotifyExternalUrls {
  spotify: string;
}

export interface ISpotifyImage {
  height: number;
  url: string;
  width: number;
}

interface ISpotifyArtist {
  external_urls: ISpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}


export interface ISpotifySearchResults<T> {
    href: string;
    items: T[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}


export interface ISpotifyAlbumResult {
  album_type: string;
  artists: ISpotifyArtist[];
  external_urls: ISpotifyExternalUrls;
  href: string;
  id: string;
  images: ISpotifyImage[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/get-an-album
export interface ISpotifyAlbum extends ISpotifyAlbumResult {
  label: string;
  external_ids: {
    upc: string;
    ean: string;
  };
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


