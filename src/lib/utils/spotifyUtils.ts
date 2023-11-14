import { Release, Track } from '@prisma/client';
import querystring from 'querystring';
import { market, baseURL } from '../actions/getSpotifyUserAlbums';
import { shuffleArray } from './utils';


async function fetchSpotifyResource<T>(path:string, query:{[key:string]:any}, accessToken:string):Promise<T> {
  const fullPath = `${baseURL}${path}?${querystring.stringify(query)}`;
  const res = await fetch(fullPath, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  return await res.json();
}

export async function getTracksDetails(trackIds: string[], accessToken: string): Promise<any[] | void> {
  try {

    const query = querystring.stringify({
      market: market,
      ids: trackIds.join(','),
    });
    const res = await fetch(`${baseURL}tracks?${query}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await res.json();
    return data.tracks;

  } catch (error) {
    console.log('ERROR - getTracksDetails', error);
  }
}

export async function getSeveralArtistsTracks(artistsIds: string[], accessToken: string) {
  try {
    const artistsTracks = await Promise.all(artistsIds.map(async (id) => {
      const topTracks = await getArtistTopTracks(id, accessToken);
      return topTracks;
    }));
    return artistsTracks;
  } catch (error) {
  }
}

export async function getTopItems(type: string, accessToken: string, limit: number) {
  try {
    const res = await fetch(`${baseURL}me/top/${type}?limit=${limit}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const items = (await res.json()).items;
    console.log(type, ' - items :>> ', items[0].name);
    if (items) return items;
    else throw new Error("empty items");

  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}

export function extractItemIds(items: any[]): string[] | void {
  try {

    if (!items) throw new Error("extractItemIds - No items");
    // console.log('extractItemIds - items :>> ', items[0]);
    const itemIds = [];
    for (let item of items) itemIds.push(item.id);

    if (itemIds) return itemIds;
    else throw new Error("empty items");
  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}

async function getArtistTopTracks(id: string, accessToken: string) {
  try {
    const query = querystring.stringify({
      market: market
    });

    const res = await fetch(`${baseURL}artists/${id}/top-tracks?${query}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await res.json();
    // console.log('getArtistTopTracks - data.tracks :>> ', data.tracks[0]);
    return data.tracks;

  } catch (error) {
    console.log('ERROR - getArtistTopTracks', error);
  }
}

export async function getAlbums(ids: string[], accessToken: string) {
  try {
    if (!ids) return;
    shuffleArray(ids);
    const query = querystring.stringify({
      ids: ids.slice(0,20).join(','),
      market: market
    });

    const res = await fetch(`${baseURL}albums/?${query}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = (await res.json());
    // console.log('getAlbums - data :>> ', data);
    return data.albums;
  } catch (error) {
    console.log('ERROR - getAlbums', error);
  }
}

export function parseAlbumToRelease(album: any): Release {

  const artists: string[] = album.artists.map((artist: { name: string; }) => artist.name);
  const barcode: string = album.external_ids.upc ? album.external_ids.upc : album.external_ids.ean;

  const release: Release = {
    id: album.id,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    title: album.name,
    label: album.label,
    releaseType: album.type,
    releaseDate: new Date(album.release_date),
    imgUrl: album.images[0]['url'],
    spotifyUri: album.external_urls.spotify,
    artists: artists,
    barcode: barcode,
    userId: null,
    discogsUrl: null
  };

  // TODO change the userId assignemtn so it doesn't overwrite existing things in the DB.
  return release;
}

export async function getSeveralTracks(trackIds:string[], accessToken:string):Promise<Track> {
  const query = {
    market: market,
    ids: trackIds,
  }

  const data = await fetchSpotifyResource<Track>('tracks', query, accessToken);
  return data;
}


export type searchQuery = {
  artist: string, 
  album: string, 
  upc?:string
}


// TODO: solve why this URL is not correctly fetching data - error 400
export async function searchSpotifyAlbum(album:string, artist:string, accessToken:string):Promise<Release> {
  
  const query = encodeURIComponent(`${album} ${artist}`);
  const qDefault = {
    type:'album',
    market: market,
    limit: 1
  }

  const fullPath = `${baseURL}search?q=${query}&${querystring.stringify(qDefault)}`;
  const res = await fetch(fullPath, {
    headers: { Authorization: 'Bearer ' + accessToken }
  });
  const topAlbum = (await res.json()).albums.items[0]
  const albumDetails = (await getAlbums([topAlbum.id], accessToken))[0]
  

  return parseAlbumToRelease(albumDetails);

}