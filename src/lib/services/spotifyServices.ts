import { ISpotifyAlbum, ISpotifySearchResults } from '@/@types';
import querystring from 'querystring';

const baseURL = 'https://api.spotify.com/v1/';
const market = 'GB';

export const generateSpotifyHeader = (accessToken: string) => {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  };

  return headers;
};

export const fetchTopItems = async (
  type: string,
  accessToken: string,
  limit: number
) => {
  try {
    const url = `${baseURL}me/top/${type}?limit=${limit}`;
    const headers = generateSpotifyHeader(accessToken);

    const res = await fetch(url, { headers });
    const { items } = await res.json();

    return items;
  } catch (error) {
    console.log('FETCH ERROR - fetchTopItems', error);
  }
};

export const fetchTracksDetails = async (
  trackIds: string[],
  accessToken: string
): Promise<any[] | void> => {
  try {
    const query = querystring.stringify({
      market,
      ids: trackIds.join(','),
    });
    const url = `${baseURL}tracks?${query}`;
    const headers = generateSpotifyHeader(accessToken);

    const res = await fetch(url, { headers });
    const { tracks } = await res.json();

    return tracks;
  } catch (error) {
    console.log('FETCH ERROR - fetchTracksDetails', error);
  }
};

export const fetchArtistTopTracks = async (id: string, accessToken: string) => {
  try {
    const query = querystring.stringify({
      market: market,
    });
    const url = `${baseURL}artists/${id}/top-tracks?${query}`;
    const headers = generateSpotifyHeader(accessToken);

    const res = await fetch(url, { headers });
    const { tracks } = await res.json();

    return tracks;
  } catch (error) {
    console.log('FETCH ERROR - fetchArtistTopTracks', error);
  }
};

export const fetchAlbum = async (id: string, accessToken: string) => {
  try {
    const query = querystring.stringify({ market });
    const url = `${baseURL}albums/${id}?${query}`;
    const headers = generateSpotifyHeader(accessToken);

    const res = await fetch(url, { headers });
    const album:ISpotifyAlbum = await res.json();

    return album;
  } catch (error) {
    console.log('FETCH ERROR - fetchAlbum', error);
    return null;
  }
};

export const fetchAlbums = async (ids: string[], accessToken: string) => {
  try {
    const query = querystring.stringify({
      ids: ids.slice(0, 20).join(','),
      market,
    });
    const url = `${baseURL}albums/?${query}`;
    const headers = generateSpotifyHeader(accessToken);

    const res = await fetch(url, { headers });
    const { albums }:{albums:ISpotifyAlbum[]} = await res.json();

    return albums;
  } catch (error) {
    console.log('FETCH ERROR - fetchAlbums', error);
  }
};

// TODO: (juan) solve why this URL is not correctly fetching data - error 400
export const searchAlbum = async (
  album: string,
  artist: string,
  accessToken: string
) => {
  try {
    const query = encodeURIComponent(`${album} ${artist}`);
    console.log('spotifyServices - searchAlbum - query :>>', query)
    const qDefault = querystring.stringify({
      type: 'album',
      market,
      limit: 1,
    });

    const url = `${baseURL}search?q=${query}&${qDefault}`;
    const headers = generateSpotifyHeader(accessToken);

    // console.log('searchAlbum :>> \n\n', {url, headers})
    const res = await fetch(url, { headers });

    // console.log('searchAlbum - res :>> ', res)
    const { albums }:{albums: ISpotifySearchResults<ISpotifyAlbum>}  = await res.json();
    if (!albums || !albums.items) throw new Error('No albums found');

    return albums.items[0];
  } catch (error) {
    console.error('FETCH ERROR - searchAlbums', error);
  }
};
