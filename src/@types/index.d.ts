import { Album } from "@spotify/web-api-ts-sdk";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface IAuthedJWT extends JWT {
  accessToken: string;
  userId: string;
}

export interface IAuthedSession extends Session {
  accessToken:string;
  userId: string;
  error: unknown;
}


export type IReleaseFull = ISpotifyAlbum & IDiscogsRelease;


/*****************
SPOTIFY TYPES
*******************/



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



/*****************
DISCOGS TYPES
*******************/

export type IDiscogsToken = {
  oauth_token: string;
  oauth_token_secret: string;
}

export type IDiscogsAuthToken = IDiscogsToken & {
  oauth_callback_confirmed: string;
}


export type IDiscogsFormat = {
  name: string;
  qty: string;
  descriptions: string[];
};

export type IDiscogsArtist = {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
};


export type IDiscogsLabel = {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
};


export type IDiscogsMetadata = {
    id: number;
    instance_id: number;
    date_added: string;
    rating: number;
    basic_information: IDiscogsBasicInfo
} 


export type IDiscogsInfo = {
  id: number;
  master_id: number;
  year: number;
  formats: IDiscogsFormat[];
  artists: IDiscogsArtist[];
  labels: IDiscogsLabel[];
  cover_image?: string;
  title: string;
}

export type IDiscogsRelease = IDiscogsInfo & {
  status: string;
  uri: string;
  released: string;
  notes: string;
  identifiers?: {
    type: string;
    value: string;
  }[];
};

export type IDiscogsBasicInfo =  IDiscogsInfo & {
  master_url: string;
  resource_url: string;
  thumb: string;
  genres: string[];
  styles: string[];
};


type IDiscogsVideo = {
  duration: number;
  description: string;
  embed: boolean;
  uri: string;
  title: string;
};


type IDiscogsImage = {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
};

type IDiscogsTrack = {
  duration: string;
  position: string;
  type_: string;
  title: string;
  extraartists?: IDiscogsArtist[]; // Reusing the Artist type from the previous definition
};

type IDiscogsMasterRelease = {
  styles: string[];
  genres: string[];
  videos: IDiscogsVideo[];
  title: string;
  main_release: number;
  main_release_url: string;
  uri: string;
  artists: IDiscogsArtist[];
  versions_url: string;
  year: number;
  images: IDiscogsImage[];
  resource_url: string;
  tracklist: IDiscogsTrack[];
  id: number;
  num_for_sale: number;
  lowest_price: number;
  data_quality: string;
};

// Integrate both types
type IDiscogsData = {
  basic_information: IDiscogsBasicInfo;
  release_information: IDiscogsReleaseInformation;
  release_details: IDiscogsReleaseDetails;
};

type IDiscogsReleaseInformation = {
  pagination: Pagination;
  versions: Version[];
};